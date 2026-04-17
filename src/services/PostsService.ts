export class PostsService {
  async loadPostsFromServer() {
    try {
      const response = await fetch('http://localhost:3000/all-items')
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error loading posts:', error)
      return []
    }
  }

  getAllPosts() {
    return this.loadPostsFromServer()
  }

  async getFavouritePosts(userId: number) {
    try {
      const response = await fetch(`http://localhost:3000/favourites/${userId}`)
      const data = await response.json()
      return data
    } catch (error) {
      console.error('Error fetching favourited posts:', error)
      return []
    }
  }

  async addFavourite(userId: number, itemId: number) {
    try {
      const response = await fetch('http://localhost:3000/favourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          account_id: userId,
          item_id: itemId,
        }),
      })

      return await response.json()
    } catch (error) {
      console.error('Error adding favourite:', error)
    }
  }

  async removeFavourite(userId: number, itemId: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/favourites/${userId}/${itemId}`,
        {
          method: 'DELETE',
        },
      )

      return await response.json()
    } catch (error) {
      console.error('Error removing favourite:', error)
    }
  }

  async deletePost(itemId: number, userId: number) {
    try {
      const response = await fetch(
        `http://localhost:3000/items/${itemId}/${userId}`,
        {
          method: 'DELETE',
        },
      )

      const text = await response.text()

      try {
        return JSON.parse(text)
      } catch {
        console.error('Delete route did not return JSON:', text)
        return { error: 'Server did not return JSON' }
      }
    } catch (error) {
      console.error('Error deleting post:', error)
      return { error: 'Delete request failed' }
    }
  }

  async getCurrentUser() {
    const raw = localStorage.getItem('currentUser')
    return raw ? JSON.parse(raw) : null
  }
}