// This is where all the API calls related to posts will be made. This includes fetching posts, creating posts, updating posts, and deleting posts.

export class PostsService {
  // Get all the posts from the server
  async loadPostsFromServer() {
    try {
      const response = await fetch('http://localhost:3000/all-items')
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error loading posts:', error)
    }
  }

  getAllPosts() {
    return this.loadPostsFromServer()
  }

  // getPostById(id: number) {
  //     // This function will fetch a single post by its ID from the server
  //     return fetch(`http://localhost:3000/items?id=${id}`)
  //         .then(response => response.json())
  //         .catch(error => console.error("Error fetching post by ID:", error));
  // }

  async getFavouritePosts(userId: number) {
    // This function will fetch all favourited posts for a specific user from the server
    return fetch(`http://localhost:3000/favourites?userId=${userId}`)
      .then((response) => response.json())
      .catch((error) => console.error('Error fetching favourited posts:', error))
  }
}
