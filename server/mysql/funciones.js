const getQuery = (action, p, d) => {
    let texto_db;
    let texto_ok;

    try {
        switch (action) {

            //FUNCIONES DE CONSULTA
            case 'login':
                query = `call login(${p.email},${p.pass});`;
                console.log(query);
                break;
            case 'getCategories':
                query = `call getCategories();`;
                break;
            case 'getArtworksCategory':
                query = `call getArtworksCategory(${p.idCategory});`;
                break;
            case 'getArtworksArtist':
                query = `call getArtworksArtist(${p.idArtist});`;
                break;
            case 'getTopArtworks':
                query = `call getTopArtworks(${p.idArtist});`;
                break;
            case 'getArtwork':
                query = `call getArtwork(${p.idArtwork});`;
                break;
            case 'getUser':
                query = `call getUser(${p.idUser});`;
                break;
            case 'getFavorites':
                query = `call getFavorites(${d.idUser});`;
                break;
            case 'getComments':
                query = `call getComments(${p.idArtwork});`;
                break;
            case 'getFollows':
                query = `call getFollows(${p.idUser});`;
                break;
            case 'getFollowers':
                query = `call getFollowers(${p.idArtist});`;
                break;
            case 'searchArtWork':
                query = `call searchArtWork(${p.search});`;
                break;

                //FUNCIONES DE MODIFICACIÓN
            case 'addUser':
                query = `call addUser(${p.name},${p.email},${p.pass},${p.address},${p.contact});`;
                break;
            case 'modifyUser':
                query = `call addUser(${p.idUser},${p.email},${p.pass},${p.address},${p.contact});`;
                break;
            case 'deleteUser':
                query = `call deleteUser(${p.idUser});`;
                break;
            case 'addArtwork':
                query = `call addArtwork(${d.idUser},${p.title},${p.description},${p.image});`;
                break;
            case 'modifyArtwork':
                query = `call modifyArtwork(${p.idArtwork},${d.idUser},${p.title},${p.description},${p.image});`;
                break;
            case 'deleteArtwork':
                query = `call deleteArtwork(${p.idArtwork});`;
                break;
            case 'addCategory':
                query = `call addCategory(${p.name});`;
                break;
            case 'modifyCategory':
                query = `call modifyCategory(${p.idCategory},${p.name});`;
                break;
            case 'deleteCategory':
                query = `call deleteCategory(${p.idCategory});`;
                break;
            case 'addArtworkCategory':
                query = `call addArtworkCategory(${p.idArtwork},${p.idCategory});`;
                break;
            case 'deleteArtworkCategory':
                query = `call deleteArtworkCategory(${p.idArtworkCategory});`;
                break;
            case 'addComment':
                query = `call addComment(${p.idArtwork},${d.idUser},${p.comment},${p.postingDate});`;
                break;
            case 'deleteComment':
                query = `call deleteComment(${p.idComment});`;
                break;
            case 'addFavoriteArtwork':
                query = `call addFavoriteArtwork(${d.idUser},${p.idArtwork});`;
                break;
            case 'deleteFavoriteArtwork':
                query = `call deleteFavoriteArtwork(${p.idFavorite});`;
                break;
            case 'addFollower':
                query = `call addFollower(${d.idUser},${p.idArtist});`;
                break;
            case 'deleteFollower':
                query = `call deleteFollower(${p.idFollow});`;
                break;

                //FUNCIÓN DESCONOCIDA
            default:
                query = null;
                texto_db = `Operación desconocida en la base de datos`;
        }
    } catch (Exception) {

    }

    return { query, texto_db, texto_ok };
};

module.exports = getQuery;