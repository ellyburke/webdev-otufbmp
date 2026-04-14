// This is where all the API calls related to posts will be made. This includes fetching posts, creating posts, updating posts, and deleting posts.

export class PostsService {
  // Get all the posts from the server
  async loadPostsFromServer() {
    try {
      //   const response = await fetch('http://localhost:3000/all-items')
      // const data = await response.json();
      const data = [
        {
          id: 1,
          name: 'Item 1',
          price: 10.99,
          description: 'Description for item 1',
          image_url: 'https://via.placeholder.com/150',
        },
        {
          id: 2,
          name: 'Item 2',
          price: 20.99,
          description: 'Description for item 2',
          image_url: 'https://via.placeholder.com/150',
        },
      ]
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
    // return fetch(`http://localhost:3000/favourites?userId=${userId}`)
    //   .then((response) => response.json())
    //   .catch((error) => console.error('Error fetching favourited posts:', error))

    return [
      {
        id: 4,
        name: 'Item 4',
        price: 40.99,
        description: 'Description for item 4',
        image_url: 'https://via.placeholder.com/150',
      },
      {
        id: 3,
        name: 'Item 3',
        price: 30.99,
        description: 'Description for item 3',
        image_url: 'https://via.placeholder.com/150',
      },
    ]
  }
}
