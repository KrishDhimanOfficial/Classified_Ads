import { configureStore } from '@reduxjs/toolkit'
import { sellerSliceReducer } from '../controller/seller.store'
import { settingSliceReducer } from '../controller/GNS.store'
import { filterListingSliceReducer } from '../controller/filterListing'

const store = configureStore({
    reducer: {
        seller: sellerSliceReducer,
        setting: settingSliceReducer,
        filterListing: filterListingSliceReducer
    }
})

export default store