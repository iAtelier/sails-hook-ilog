// const path = require('path');
// const renderer = require('vue-server-renderer').createRenderer({
//     template: require('fs').readFileSync( path.join(__dirname, '../../../index.template.html'), 'utf-8')
// })
// const Vue = require('vue')
// const createApp = require('../../../src/vue/index') //  require('/path/to/built-server-bundle.js')

module.exports = {
    friendlyName: 'Digital',
    description: 'Returning an instance of the digital dispaly',
    inputs: {
        id: { type: 'number' },
    },
    exits: {
        success: {
            responseType: 'view',
            viewTemplatePath: 'vendors/ilog/digital'
        },
        page: {
            statusCode: 200,
            outputType: 'ref'
        },
    },
    fn: async function (inputs, exits) {

        if ( this.req.accepts('html','json') === 'json' ) {

            const Post = sails.hooks.borm.bookshelf.model('Post');

            post = await Post.forge({id: inputs.id})
                .fetch({withRelated: Post.DIMENSIONS})
                .then(model => { return model; });

            result = post.toJSON();
            result['content'] = post.content();
            result['view'] = 'post_body';
            result['keywords'] = await post.keywords().then(result => {return result;});

            return exits.page(result);

        } else {

            // const context = { url: req.url }

            // createApp(context).then(app => {
            //     renderer.renderToString(app, (err, html) => {
            //     if (err) {
            //         if (err.code === 404) {
            //         res.status(404).end('Page not found')
            //         } else {
            //         res.status(500).end('Internal Server Error')
            //         }
            //     } else {
            //         res.end(html)
            //     }
            //     })
            // })

            let config = JSON.stringify(sails.config.ilog);
            return exits.success({
                config: config,
            });
        }
    }
};