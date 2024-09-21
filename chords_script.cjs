#!/usr/bin/env node
'use strict'

const fs = require('fs');
const path = require('path');
const md = require('markdown-it')()
  .use(require('markdown-it-chords'));

var files = fs.readdirSync('./src/markdown');
for (var i = 0; i < files.length; i++) {

  const input_md = fs.readFileSync('./src/markdown/' + files[i], { encoding: 'utf8' });
  //console.log(input_md);
  const generated_song = md.render(input_md);
  //console.log(generated_song);

  let output = `<html>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>${path.parse(files[i]).name}</title>
</head>
<style>
:root {
	--chord-diagram-font-size: 10px;
}
.chord {
	display: inline-block;
	position: relative;
	user-select: none;
	height: 3.2em;
	font-size: 70%;
}
.chord.diagram {
	height: calc(1.5em + (3.5 * var(--chord-diagram-font-size)))
}
.chord .inner {
	position: absolute;
	display: block;
	left: 0;
	bottom: 1.3em;
}
.chord i {
	font-style: normal;
	display: inline-block;
}
.chord i.diagram {
	font: 100 var(--chord-diagram-font-size) Courier;
	line-height: .5em;
	position: absolute;
	bottom: 0;
	display: none;
}
.chord .inner:hover i.diagram,
.chord.diagram i.diagram,
.chord i.diagram.show {
	display: inline-block;
}
.chord:not(.diagram) .inner:hover i.diagram {
	background: white;
	z-index: 5;
}
</style>

<body>

  ${generated_song}

</body>
</html>
`

  console.log('./src/parsed/' + path.parse(files[i]).name + '.html');
  fs.writeFileSync('./src/parsed/' + path.parse(files[i]).name + '.html', output);

}
