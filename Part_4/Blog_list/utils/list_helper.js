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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}