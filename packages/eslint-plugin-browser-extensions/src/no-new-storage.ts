const rule = {
  create: function (context) {
    return {
      NewExpression: function (node) {
        if (node.callee.name === "Storage") {
          context.report({
            messageId: "noNewStorage",
            node: node
          })
        }
      }
    }
  },
  meta: {
    docs: {
      category: "Best Practices",
      description: "disallow instantiation of the Storage class using `new`",
      recommended: true
    },
    messages: {
      noNewStorage: "Instantiation of the Storage class is not allowed."
    },
    schema: [],
    type: "problem"
  }
}

export default rule
