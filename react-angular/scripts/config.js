const config = {
    api: {
        posts: {
            url: 'http://localhost:9000/api/blogs',
            add: function(id) {
                return 'http://localhost:9000/api/blogs/' + id;
            }
        },
        user: {
            login: 'http://localhost:9000/api/login',
            register: 'http://localhost:9000/api/register'
        }
    }
};

export default config;