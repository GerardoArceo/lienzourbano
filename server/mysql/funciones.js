const getQuery = (action, p, d) => {
    let query;
    let texto_db;
    let texto_ok;

    try {
        switch (action) {

            //FUNCIONES DE CONSULTA
            case 'login':
                query = `call login(${p.email},${p.pass});`;
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
                query = `call getTopArtworks();`;
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
                query = `call getFollows(${d.idUser});`;
                break;
            case 'getFollowers':
                query = `call getFollowers(${p.idArtist});`;
                break;
            case 'searchArtWork':
                query = `call searchArtWork(${p.search});`;
                break;
            case 'getOpenAuctions':
                query = `call getOpenAuctions(${p.now});`;
                break;
            case 'getWonAuctions':
                query = `call getWonAuctions(${d.idUser});`;
                break;
            case 'getAuctionsArtist':
                query = `call getAuctionsArtist(${d.idUser});`;
                break;

                //FUNCIONES DE MODIFICACIÓN
            case 'addUser':
                query = `call addUser(${p.name},${p.email},${p.pass},${p.address},${p.contact},${p.photo});`;
                texto_ok = `Registro exitoso`;
                break;
            case 'modifyUser':
                query = `call addUser(${p.idUser},${p.email},${p.pass},${p.address},${p.contact},${p.photo});`;
                texto_ok = `Modificación exitosa`;
                break;
            case 'deleteUser':
                query = `call deleteUser(${p.idUser});`;
                texto_ok = `Usuario borrado correctamente`;
                break;
            case 'addArtwork':
                query = `call addArtwork(${d.idUser},${p.title},${p.description},${p.image});`;
                texto_ok = `Obra agregada correctamente`;
                break;
            case 'modifyArtwork':
                query = `call modifyArtwork(${p.idArtwork},${d.idUser},${p.title},${p.description},${p.image});`;
                texto_ok = `Modificación exitosa`;
                break;
            case 'deleteArtwork':
                query = `call deleteArtwork(${p.idArtwork});`;
                texto_ok = `Obra borrada correctamente`;
                break;
            case 'addCategory':
                query = `call addCategory(${p.name});`;
                texto_ok = `Categoría agregada correctamente`;
                break;
            case 'modifyCategory':
                query = `call modifyCategory(${p.idCategory},${p.name});`;
                texto_ok = `Modificación exitosa`;
                break;
            case 'deleteCategory':
                query = `call deleteCategory(${p.idCategory});`;
                texto_ok = `Categoría borrada correctamente`;
                break;
            case 'addArtworkCategory':
                query = `call addArtworkCategory(${p.idArtwork},${p.idCategory});`;
                break;
            case 'deleteArtworkCategory':
                query = `call deleteArtworkCategory(${p.idArtworkCategory});`;
                break;
            case 'addComment':
                query = `call addComment(${p.idArtwork},${d.idUser},${p.comment});`;
                texto_ok = `Comentario agregado correctamente`;
                break;
            case 'deleteComment':
                query = `call deleteComment(${p.idComment});`;
                texto_ok = `Comentario eliminado correctamente`;
                break;
            case 'addFavoriteArtwork':
                query = `call addFavoriteArtwork(${d.idUser},${p.idArtwork});`;
                texto_ok = `Obra agregada a favoritos`;
                break;
            case 'deleteFavoriteArtwork':
                query = `call deleteFavoriteArtwork(${p.idFavorite});`;
                texto_ok = `Obra eliminada de favoritos`;
                break;
            case 'addFollower':
                query = `call addFollower(${d.idUser},${p.idArtist});`;
                texto_ok = `Ahora sigues a este usuario`;
                break;
            case 'deleteFollower':
                query = `call deleteFollower(${p.idFollow});`;
                texto_ok = `Dejaste de seguir a este usuario`;
                break;
            case 'addAuction':
                query = `call addAuction(${p.idArtwork},${d.idUser},${p.initialPrize},${p.postingDate},${p.closeDate});`;
                texto_ok = `Agregaste una subasta`;
                break;
            case 'updateAuction':
                query = `call updateAuction(${p.idAuction}, ${d.idUser}, ${p.prize});`;
                texto_ok = `Oferta realizada con éxito`;
                break;
            case 'deleteAuction':
                query = `call deleteAuction(${p.idAuction});`;
                texto_ok = `Eliminaste esta subasta`;
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