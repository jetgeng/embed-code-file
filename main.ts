import { Plugin, MarkdownRenderer, TFile, MarkdownPostProcessorContext, MarkdownView, normalizePath, parseYaml, requestUrl} from 'obsidian';
import { DEFAULT_SETTINGS,EmbedCodeFileSettings} from "./settings";
//import { analyseSrcLines, extractSrcLines} from "./utils";

export default class EmbedCodeFile extends Plugin {
	settings: EmbedCodeFileSettings;

	async onload() {

		await this.loadSettings()

		this.registerMarkdownPostProcessor((element, context) => {
			this.addTitle(element, context);
		});

		// live preview renderers
		const supportedLanguages = this.settings.includedLanguages;
		supportedLanguages.forEach(l => {
			this.registerRenderer(l)
		});
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async registerRenderer(lang: string) {
		this.registerMarkdownCodeBlockProcessor(`embed-${lang}`, async (meta, el, ctx) => {
			let fullSrc = ""
			let src = ""

			let metaYaml: any
			try {
				metaYaml = parseYaml(meta)
			} catch(e) {
				await MarkdownRenderer.renderMarkdown("`ERROR: invalid embedding (invalid YAML)`", el, '', this)
				return
			}

			let srcPath = metaYaml.path

			if (!srcPath) {
				await MarkdownRenderer.renderMarkdown("`ERROR: invalid source path`", el, '', this)
				return
			}

			const activeFile = this.app.workspace.getActiveFile()
			if (!activeFile || !activeFile.path) {
				await MarkdownRenderer.renderMarkdown("`ERROR: invalid source path`", el, '', this)
				return
			}

			let fullPath = this.app.metadataCache.getFirstLinkpathDest(srcPath,  activeFile.path);
			if(!fullPath) {
				await MarkdownRenderer.renderMarkdown("`ERROR: invalid source path`", el, '', this)
				return
			}
				
			fullSrc = await app.vault.read(fullPath)

			let title = metaYaml.title
			if (!title) {
				title = srcPath
			}
			await MarkdownRenderer.renderMarkdown('```' + lang + '\n' + fullSrc + '\n```', el, '', this)
			this.addTitleLivePreview(el,title)

		});
	}

	addTitleLivePreview(el: HTMLElement, title: string) {
		const codeElm = el.querySelector('pre > code')
		if (!codeElm) { return }
		const pre = codeElm.parentElement as HTMLPreElement;

		this.insertTitlePreElement(pre, title)
	}

	addTitle(el: HTMLElement, context: MarkdownPostProcessorContext) {
		// add some commecnt 
		let codeElm = el.querySelector('pre > code')
		if (!codeElm) {
			return
		}

		const pre = codeElm.parentElement as HTMLPreElement;

		const codeSection = context.getSectionInfo(pre)
		if (!codeSection) {
			return
		}

		const view = app.workspace.getActiveViewOfType(MarkdownView)
		if (!view) {
			return
		}

		const num = codeSection.lineStart
		const codeBlockFirstLine = view.editor.getLine(num)

		let matchTitle = codeBlockFirstLine.match(/TITLE:\s*"([^"]*)"/i)
		if (matchTitle == null) {
			return
		}

		const title = matchTitle[1]
		if (title == "") {
			return
		}

		this.insertTitlePreElement(pre, title)
	}

	insertTitlePreElement(pre: HTMLPreElement, title: string) {
		pre
		.querySelectorAll(".obsidian-embed-code-file")
		.forEach((x) => x.remove());

		let titleElement = document.createElement("pre");
		titleElement.appendText(title);
		titleElement.className = "obsidian-embed-code-file";
		//titleElement.style.color = this.settings.titleFontColor;
		//titleElement.style.backgroundColor = this.settings.titleBackgroundColor;
		pre.prepend(titleElement);
	}
}
