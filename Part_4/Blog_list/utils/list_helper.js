const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const total = blogs.reduce((sum , blog) => {
        return sum + blog.likes
    },0)

    return total
}

const favoriteBlog = (blogs) => {
    if (!blogs[0]){
        return 'empty'
    }

    const mostLikes = Math.max(...blogs.map(blog => blog.likes))
    const mostLikedBlog = blogs.find(blog => blog.likes === mostLikes)
  
    return mostLikedBlog
}

const mostBlog = (blogs) => {

   const authorCounts = _.countBy(blogs,'author')

    const topAuthor = Object.entries(authorCounts)
            .reduce((max,[author, blogs]) => blogs > max.blogs ? {author,blogs} : max,{ author: null, blogs: 0})
    

    return topAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog
}