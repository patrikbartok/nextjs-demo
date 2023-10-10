export const userId: number = 1

export const userQueryKey = ['users', userId]
export const userApi: string = `http://localhost:3000/api/users/${userId}`

export const unseenPostQueryKey = ['users', userId, 'unseenPosts']
export const unseenPostsApi: string = `http://localhost:3000/api/users/${userId}/unseenPosts`

export const likedPostQueryKey = ['users', userId, 'likedPosts']
export const likedPostsApi: string = `http://localhost:3000/api/users/${userId}/likedPosts`
