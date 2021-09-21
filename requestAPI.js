//API

//Page related

//API return all page information

//request body sent from client
requestBody = {};//empty
//API output
output = {
    pages: [
        {
            pageID: "",
            pageName: "",
        },
        {
            pageID: "",
            pageName: "",
        },
        {
            pageID: "",
            pageName: "",
        },
        {
            pageID: "",
            pageName: "",
        },
        {
            pageID: "",
            pageName: "",
        },
        {
            pageID: "",
            pageName: "",
        },
    ]
}

//API return single page information
//request body sent from client
requestBody = { pageID: "" };//contain some pageID
//API output
output = {
    page: {
        pageID: "",
        pageName: "",
        collections: [
            { collectionID="", collectionName="", collectionImage="" },
            { collectionID="", collectionName="", collectionImage="" },
            { collectionID="", collectionName="", collectionImage="" },
            { collectionID="", collectionName="", collectionImage="" },
        ]
    }
}

//API return all collections information
//request body sent from client
requestBody = {};//empty
ouput = {
    collections: [
        {
            collectionID="",
            collectionName="",
            collectionImage="",
        },
        {
            collectionID="",
            collectionName="",
            collectionImage="",
        },
        {
            collectionID="",
            collectionName="",
            collectionImage="",
        },
        {
            collectionID="",
            collectionName="",
            collectionImage="",
        },
        {
            collectionID="",
            collectionName="",
            collectionImage="",
        },

    ]
}

//API return single collection information
//request body sent from client
requestBody = { collectionID: "" };//contain some collectionID
//API output
output = {
    collection: {
        collectionID: "",
        collectionName: "",
        collectionImage: "",
        categories: [
            { categoryID="", categoryName="" },
            { categoryID="", categoryName="" },
            { categoryID="", categoryName="" },
            { categoryID="", categoryName="" },
        ]
    }
}

//API return single category information
//request body sent from client
requestBody = { categoryID: "" };//contain some cateogryID  
//API output (return all variance of all product belong to that category)
output = {
    products: [
        {
            productVarianceID: "",
            productID: "",
            productName: "",
            description: "",
            color: "",
            size: "",
            price: "",
            inventory: ""
        },
        {
            productVarianceID: "",
            productID: "",
            productName: "",
            description: "",
            color: "",
            size: "",
            price: "",
            inventory: ""
        },

    ]
}

//API return single product information
//request body sent from client
requestBody = { productVarianceID: "" };//contain some varianceID  
//API output (return all information of that variance)
output = {
    product: {
        productVarianceID: "",
        productID: "",
        productName: "",
        description: "",
        color: "",
        size: "",
        price: "",
        inventory: ""
    }
}
