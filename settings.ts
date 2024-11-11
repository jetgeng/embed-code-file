import EmbedCodeFile from './main';

import { PluginSettingTab, Setting, App } from 'obsidian';

export interface EmbedCodeFileSettings {
	includedLanguages: string[];
	titleBackgroundColor: string;
	titleFontColor: string;
}

export const DEFAULT_SETTINGS: EmbedCodeFileSettings = {
	includedLanguages: ["markup",
                        "css",
                        "clike",
                        "javascript",
                        "abap",
                        "actionscript",
                        "ada",
                        "apacheconf",
                        "apl",
                        "applescript",
                        "arduino",
                        "arff",
                        "asciidoc",
                        "asm6502",
                        "aspnet",
                        "autohotkey",
                        "autoit",
                        "bash",
                        "basic",
                        "batch",
                        "bison",
                        "brainfuck",
                        "bro",
                        "c",
                        "csharp",
                        "cpp",
                        "coffeescript",
                        "clojure",
                        "crystal",
                        "csp",
                        "css-extras",
                        "d",
                        "dart",
                        "diff",
                        "django",
                        "docker",
                        "eiffel",
                        "elixir",
                        "elm",
                        "erb",
                        "erlang",
                        "fsharp",
                        "flow",
                        "fortran",
                        "gedcom",
                        "gherkin",
                        "git",
                        "glsl",
                        "gml",
                        "go",
                        "graphql",
                        "groovy",
                        "haml",
                        "handlebars",
                        "haskell",
                        "haxe",
                        "http",
                        "hpkp",
                        "hsts",
                        "ichigojam",
                        "icon",
                        "inform7",
                        "ini",
                        "io",
                        "j",
                        "java",
                        "jolie",
                        "json",
                        "julia",
                        "keyman",
                        "kotlin",
                        "latex",
                        "less",
                        "liquid",
                        "lisp",
                        "livescript",
                        "lolcode",
                        "lua",
                        "makefile",
                        "markdown",
                        "markup-templating",
                        "matlab",
                        "mel",
                        "mizar",
                        "monkey",
                        "n4js",
                        "nasm",
                        "nginx",
                        "nim",
                        "nix",
                        "nsis",
                        "objectivec",
                        "ocaml",
                        "opencl",
                        "oz",
                        "parigp",
                        "parser",
                        "pascal",
                        "perl",
                        "php",
                        "php-extras",
                        "plsql",
                        "powershell",
                        "processing",
                        "prolog",
                        "properties",
                        "protobuf",
                        "pug",
                        "puppet",
                        "pure",
                        "python",
                        "q",
                        "qore",
                        "r",
                        "jsx",
                        "tsx",
                        "renpy",
                        "reason",
                        "rest",
                        "rip",
                        "roboconf",
                        "ruby",
                        "rust",
                        "sas",
                        "sass",
                        "scss",
                        "scala",
                        "scheme",
                        "smalltalk",
                        "smarty",
                        "sql",
                        "soy",
                        "stylus",
                        "swift",
                        "tap",
                        "tcl",
                        "textile",
                        "tt2",
                        "twig",
                        "typescript",
                        "vbnet",
                        "velocity",
                        "verilog",
                        "vhdl",
                        "vim",
                        "visual-basic",
                        "wasm",
                        "wiki",
                        "xeora",
                        "xojo",
                        "xquery",
                        "yaml"],
	titleBackgroundColor: "#00000020",
	titleFontColor: ""
}

export class EmbedCodeFileSettingTab extends PluginSettingTab {
	plugin: EmbedCodeFile;

	constructor(app: App, plugin: EmbedCodeFile) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();
		containerEl.createEl('h2', {text: 'Embed Code File Settings'});

		new Setting(containerEl)
			.setName("Font color of title")
			.addText(text => text
				.setPlaceholder('Enter a color')
				.setValue(this.plugin.settings.titleFontColor)
				.onChange(async (value) => {
					this.plugin.settings.titleFontColor = value;
					await this.plugin.saveSettings();
				}));
		  
		new Setting(containerEl)
			.setName('Background color of title')
			.addText(text => text
				.setPlaceholder('#00000020')
				.setValue(this.plugin.settings.titleBackgroundColor)
				.onChange(async (value) => {
					this.plugin.settings.titleBackgroundColor = value;
					await this.plugin.saveSettings();
				}));
	}
}
