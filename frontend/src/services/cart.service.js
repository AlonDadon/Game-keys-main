
import { storageService } from './async-Storage.service'
import { gameService } from './game.service'
const STORAGE_KEY = 'cart'

export const cartService = {
    add,
    query,
    remove,
    getGamesByCarts,
    removeAll
}



async function query(filterBy) {

    const carts = await storageService.query(STORAGE_KEY)
    return carts
}
async function remove(gameId) {
    const carts = await query()
    const cart = carts.find(cart => cart.game._id === gameId)

    return storageService.remove(STORAGE_KEY, cart._id)
}
async function removeAll(gameId) {

    return storageService.removeAll(STORAGE_KEY)
}

    async function checkIsDuplicate(gameId) {
        const carts = await query()
        return carts.some(cart => cart.game._id === gameId)
    }

    async function add({ game, }) {
        const { price, discount, title, seller, _id, serialKey } = game
        const isDuplicate = await checkIsDuplicate(_id)
        if (isDuplicate) return null

        const img = game.imgs.largeImgUrls[0]
        const cart = {
            game: {
                _id: game._id,
                price,
                discount,
                title,
                sellerId: seller._id,
                img,
                serialKey
            },
        }
        const addedCart = storageService.post(STORAGE_KEY, cart)
        return addedCart
    }
    async function getGamesByCarts() {
        const games = await gameService.getGames()
        const carts = await query()
        const filterGames = carts.reduce((acc, cart) => {
            const game = games.filter(game => game._id === cart.game._id)
            return [...acc, ...game]
        }, [])
        return filterGames
    }