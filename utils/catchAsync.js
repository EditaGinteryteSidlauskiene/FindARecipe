//This file is used to define a catchAsync function, so there would need to
//add an error handling in every asynch function

module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}
