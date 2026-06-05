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

    const newBlogList = blogs.map(blog => {
        let count = 0
        for(let i=0;i<blogs.length;i++){
            if(blog.author === blogs[i].author){
                count++
            }
        }
        return { author: blog.author, blogs: count}
    })

    const uniqueBlogList = [...new Map(newBlogList.map(blog =>[blog.author,blog])).values()]

    const topAuthor = uniqueBlogList.reduce((max,{ author, blogs}) => blogs > max.blogs ? {author,blogs} : max,{ author: null, blogs: 0})
    

    return topAuthor
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlog
}