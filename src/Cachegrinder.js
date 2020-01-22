import {FileReader} from './Core/FileReader';
import {Node} from "./Core/Node"
import {Collection} from "./Core/Collection"
import {File} from "./Core/File"

const {Call} = require("../dist/Core/Call")

export class Cachegrinder {
	static read(path) {
		return new Promise((resolve, reject) => {
			let collection = new Collection();

			new FileReader(path, (err, fileReader) => {
				if (err) {
					reject(err);
				}

				while (!fileReader.end()) {
					let file = null;
					let node = null;

					if (fileReader.line() === '') {
						fileReader.nextLine();
						continue;
					}

					if (fileReader.line().match(new RegExp('^fl='))) {
						let id = parseInt(fileReader.line().match(new RegExp('^fl=\\((\\d+)\\)'))[1]);
						file = collection.hasFile(id) ? collection.getFile(id) : new File(id);

						if (!file.name) {
							file.name = fileReader.line().match(new RegExp('^fl=\\(\\d+\\)\\s?(.+)'))[1];
							collection.addFile(file);
						}

						if (fileReader.nextLine().match(new RegExp('^fn='))) {
							let id = parseInt(fileReader.line().match(new RegExp('^fn=\\((\\d+)\\)'))[1]);
							node = collection.hasNode(id) ? collection.getNode(id) : new Node(id);

							if (!node.name) {
								node.name = fileReader.line().match(new RegExp('^fn=\\(\\d+\\)\\s?(.+)'))[1];
							}

							if (!node.filename) {
								node.filename = file.name;
							}
						}

						// Служебная информация
						if (fileReader.nextLine().match(new RegExp('^\\d+ \\d+ \\d+'))) {
							/*let str = fileReader.line().match(new RegExp('^(\\d+) (\\d+) (\\d+)'));

							node.line = parseInt(str[1]);

							node.summedSelfCost += parseInt(str[2]);
							node.summedInclusiveCost += parseInt(str[2]);
							node.invocationCount += 1;*/
						}

						while (fileReader.nextLine() !== '' && !fileReader.end()) {
							let subCallFile = null;
							let subCallNode = null;
							let info = null;

							if (fileReader.line().match(new RegExp('^cfl='))) {
								subCallFile = collection.getFile(fileReader.line().match(new RegExp('^cfl=\\((\\d+)\\)'))[1]);
							}

							if (fileReader.nextLine().match(new RegExp('^cfn='))) {
								subCallNode = collection.getNode(fileReader.line().match(new RegExp('^cfn=\\((\\d+)\\)'))[1]);
							}

							if (fileReader.nextLine().match(new RegExp('^calls='))) {
								//console.log(`Calls`, fileReader.line())
							}

							if (fileReader.nextLine().match(new RegExp('^-?\\d+ -?\\d+ -?\\d+'))) {
								info = fileReader.line().match(new RegExp('^(-?\\d+) (-?\\d+) (-?\\d+)'));
							}

							// Sub Calls
							let subCall = node.hasSubCallById(subCallNode.id) ? node.getSubCallById(subCallNode.id) : new Call(parseInt(info[1]), subCallNode);

							if (subCall.callCount <= 0) {
								node.subCalls = subCall;
							}

							subCall.node.invocationCount += 1;
							subCall.callCount += 1;
							subCall.cost += parseInt(info[2]);

							// Called From
							let calledFrom = subCallNode.hasCalledFromById(node.id) ? subCallNode.getCalledFromById(node.id) : new Call(parseInt(info[1]), node);

							if (calledFrom.callCount <= 0) {
								subCallNode.calledFrom = calledFrom;
							}

							calledFrom.callCount += 1;
							calledFrom.cost += parseInt(info[2]);

							subCallNode.summedInclusiveCost += parseInt(info[2]);
						}

						if (!collection.hasNode(node.id)) {
							collection.addNode(node);
						}

						continue;
					}

					if (fileReader.line().match(new RegExp('^cmd:'))) {
						collection.info.cmd = fileReader.line().match(new RegExp('^cmd:\\s+(.+)'))[1];
					}

					if (fileReader.line().match(new RegExp('^part:'))) {
						collection.info.part = fileReader.line().match(new RegExp('^part:\\s(.+)'))[1];
					}

					if (fileReader.line().match(new RegExp('^positions:'))) {
						collection.info.positions = fileReader.line().match(new RegExp('^positions:\\s+(.+)'))[1];
					}

					if (fileReader.line().match(new RegExp('^events:'))) {
						collection.info.events = fileReader.line().match(new RegExp('^events:\\s?(.+)'))[1];
					}

					if (fileReader.line().match(new RegExp('^creator:'))) {
						collection.info.creator = fileReader.line().match(new RegExp('^creator:\\s?(.+)'))[1];
					}

					if (fileReader.line().match(new RegExp('^version:'))) {
						collection.info.version = fileReader.line().match(new RegExp('^version:\\s?(\\d+)'))[1];
					}

					if (fileReader.line().match(new RegExp('^summary:'))) {
						collection.info.summary = parseInt(fileReader.line().match(new RegExp('^summary:\\s+(\\d+)'))[1]);
					}

					fileReader.nextLine();
				}

				resolve(collection);
			});
		});
	}
}