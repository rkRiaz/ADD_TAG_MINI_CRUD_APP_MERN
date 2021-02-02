const Data = require('../models/Data')
const { validationResult } = require('express-validator')


exports.saveData= async (req, res, next) => {
    // try {
    //     let { countries, tag } = req.body
    //     let data = await new Data({
    //         countries: countries,
    //         tags: [tag]
    //     }).save()
    //     res.status(200).json({
    //         message: `Successfully saved data`,
    //         countries: data.countries,
    //         tags: data.tags
    //     })
    // }
    // catch (e) {
    //     next(e)
    // }
}

exports.getData = async (req, res, next) => {
    try {
        let data = await Data.find()
        res.status(200).json({
            message: "Successfully fetched data",
            countries: data[0].countries.map(c => { return c.name }),
            tags: data[0].tags
        })
    }
    catch (e) {
        next(e)
    }
}



exports.addTag = async (req, res, next) => {
    let { tag } = req.body
    let data = await Data.find()
    let findTag = data[0].tags.find(t => t === tag )
    try {
        if(findTag) {
            res.status(200).json({
                message: "Already added",
            })
        } else {
            await Data.updateOne(
                { $push: { 'tags': tag } }
            )
            res.status(200).json({
                message: `Successfully added ${tag}`,
            })
        }
    }
    catch (e) {
        next(e)
    }
}

exports.deleteTag = async (req, res, next) => {
    let { tag } = req.body
    try {
        await Data.updateOne(
            { $pull: { 'tags': tag } }
        )
        res.status(200).json({
            message: `Successfully deleted ${tag}`,
        })
    }
    catch (e) {
        next(e)
    }
}

exports.seacrhText = async (req, res, next) => {
    const string =  req.query.q.toLowerCase()
   
    try {
            let data = await Data.find()
            let countries = data[0].countries.map(c => { return c.name })
            let tags = data[0].tags

            let a = countries.map(country => ( string.search(country.toLowerCase()) ))
            let index = a.findIndex(b => b !== -1)

            if(index >= 0) {
                let tag = countries[index]
                let findTag = tags.find(t=> t === tag)
                if(findTag) {
                    res.status(200).json({
                        message: `Already added ${findTag}`
                    })
                }
                if(!findTag) {
                    await Data.updateOne(
                        { $push: { 'tags': tag } }
                    )
                    res.status(200).json({
                        message: `Successfully added ${tag}`,
                    })
                }
            } else {
                res.status(200).json({
                    message: `Does not find any country`,
                })  
            }
    }
    catch (e) {
        next(e)
    }
}







