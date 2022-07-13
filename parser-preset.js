module.exports = {
  parserOpts: {
    headerPattern: /^(\[#\d*\])\s{1}(\w*)(?:\(([\w\$\.\-\* ]*)\))?\: (.*)$/,
    headerCorrespondence: ['issue', 'type', 'scope', 'subject']
  }
}
