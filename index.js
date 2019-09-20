const {EditorState, Plugin} = require("prosemirror-state")
const {EditorView, Decoration, DecorationSet} = require("prosemirror-view")
const {Schema, DOMParser} = require("prosemirror-model")
const {schema} = require("prosemirror-schema-basic")
const {addListNodes} = require("prosemirror-schema-list")
const {exampleSetup} = require("prosemirror-example-setup")

new Plugin({
  props: {
    decorations(state) {
      return DecorationSet.create(state.doc, [
        Decoration.inline(0, state.doc.content.size, {class: "paren"})
      ])
    }
  }
})

// Mix the nodes from prosemirror-schema-list into the basic schema to
// create a schema with list support.
const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, "paragraph block*", "block"),
  marks: schema.spec.marks
})

let plugins = exampleSetup({schema: mySchema})
plugins.push(purplePlugin)

window.view = new EditorView(document.querySelector("#editor"), {
  state: EditorState.create({
    doc: DOMParser.fromSchema(mySchema).parse(document.querySelector("#content")),
    plugins
  })
})