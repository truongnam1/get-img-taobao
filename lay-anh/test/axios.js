async function getfbProfile(token) {
    try {
        const user = await axios.get('https://graph.facebook.com/me', {
            params: {
                access_token: token,
                fields: 'picture,accounts',
            },
        });
        const pages = Promise.all(user.data.accounts.data.map(({ id }) => axios.get(`https://graph.facebook.com/${id}`, {
            params: {
                access_token: token,
                fields: 'picture,name',
            },
        })));
        const fbProfile = await Promise.all([user, pages]);
        debug(fbProfile);
    } catch (err) {
        debug(err.stack);
    }
}