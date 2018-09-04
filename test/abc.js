var { graphql, buildSchema } = require('graphql');

// 使用 GraphQL schema language 构建一个 schema
var schema = buildSchema(`
  type Query {
    hello: String,
    china: String
  }
`);

// 根节点为每个 API 入口端点提供一个 resolver 函数
var root = {
    hello: () => {
        return 'Hello world!';
    },
    china: () => {
        return '你好!';
    },
};

// 运行 GraphQL query '{ hello }' ，输出响应
graphql(schema, '{ hello,china }', root).then(response => {
    console.log(response);
});
