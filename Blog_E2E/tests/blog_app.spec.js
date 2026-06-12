const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWith , createBlog} = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
        data: {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
    })
    await request.post('/api/users', {
        data: {
            name: 'Superuser',
            username: 'rooter',
            password: 'salainen'
        }
    })
   
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('login')).toBeVisible()
  })

  test('Login succeed with correct credentials', async ({page}) => {
    await page.getByText('login').click()
    await loginWith(page,'mluukkai','salainen')
    await expect(page.getByRole('button',{name:'logout'})).toBeVisible()
  })

  test('login fails if credentials are wrong', async ({page}) => {
    await page.getByText('login').click()
    await loginWith(page,'mluukkai','sala')
    await expect(page.getByRole('button',{name:'logout'})).not.toBeVisible()
  })

  describe('logged in user' , () => {
    beforeEach(async ({page,request}) => {
        await page.getByText('login').click()
        await loginWith(page,'mluukkai','salainen')
    })

    test('A logged-in user can create a blog',async ({page}) => {
        await expect(page.getByText('logout')).toBeVisible()
        await page.getByText('new Blog').click()
        await createBlog(page,'a new blog','after modification','http:///')
        await expect(page.getByText('a new blog by after modification')).toBeVisible()
    })

    test('a logged-in user can like a blog', async({page}) => {
        await expect(page.getByText('logout')).toBeVisible()
        await page.getByText('new Blog').click()
        await createBlog(page,'test a','playwright','htpss....')
        await expect(page.getByText('test a by playwright')).toBeVisible()
        await page.getByText('test a by playwright').click()
        await expect(page.getByRole('button',{name:'like'})).toBeVisible()
        await page.getByRole('button',{name:'like'}).click()
        await expect(page.getByText('Likes 1')).toBeVisible()
    })

     test('a logged-in user can delete a blog', async({page}) => {

        page.on('dialog', async(dialog) => {
            await dialog.accept()
       })        
        await expect(page.getByText('logout')).toBeVisible()
        await page.getByText('new Blog').click()
        await createBlog(page,'test a','playwright','htpss....')
        await expect(page.getByText('test a by playwright')).toBeVisible()
        await page.getByText('test a by playwright').click()
        await expect(page.getByRole('button',{name:'remove'})).toBeVisible()
        await page.getByRole('button',{name:'remove'}).click()
        await expect(page.getByText('playwright:test a')).not.toBeVisible()
        await expect(page.getByText('test a by playwright')).not.toBeVisible()
    })


  })
//   describe('login', () => {
//     test('succeed with correct credentials', async ({page}) => {
//         await loginWith(page,'mluukkai','salainen')

//         await expect(page.getByText('mluukkai logged in')).toBeVisible()
//     })

//     test('fails with wrong credentials', async ({page}) => {
//         await loginWith(page,'mluukkai','wrong')

//         await expect(page.getByText('blogs')).not.toBeVisible()
//         await expect(page.getByText('wrong username or password')).toBeVisible()
//     })

    
//     })

//     describe('when logged in ', () => {
//         beforeEach( async ({page,request}) => {
//             await loginWith(page, 'mluukkai', 'salainen')
//         })

//         test('a new blog can be created', async ({page}) => {
//             await createBlog(page,'a new blog by playwright','fullstack','404')

//             await expect(page.getByText('a new blog by playwright fullstack')).toBeVisible()

//         })

//         describe('default blogs is created',() => {
//             beforeEach(async ({page,request}) => {
                
//                 await createBlog(page,'a default blog','compiler','playwright.com')
//                 await createBlog(page,'a default blog2','browser','201')

//             })

//             test('a blog can be liked ', async({page}) => {
//                 const blogElement = await page.getByText('a default blog compiler')

//                 await blogElement.getByRole('button', {name:'view'}).click()
//                 await expect(page.getByText('likes 0')).toBeVisible()
        
//                 await page.getByRole('button', {name:'like'}).click()
//                 await expect(page.getByText('likes 1')).toBeVisible()

//             })

//             test('ordered blog', async({page}) => {
                
//                 await createBlog(page, 'least liked blog', 'author1', 'http://url1.com')
//                 await createBlog(page, 'most liked blog', 'author2', 'http://url2.com')
//                 await createBlog(page, 'middle liked blog', 'author3', 'http://url3.com')

//                 const blog1 = page.locator('.blog-summary').filter({ hasText: 'most liked blog' })
//                 await blog1.getByRole('button', { name: 'view' }).click()
//                 await blog1.getByRole('button', { name: 'like' }).click()
//                 await expect(blog1.getByText('likes 1')).toBeVisible()
//                 await blog1.getByRole('button', { name: 'like' }).click()
//                 await expect(blog1.getByText('likes 2')).toBeVisible()

//                 const blog2 = page.locator('.blog-summary').filter({ hasText: 'middle liked blog' })
//                 await blog2.getByRole('button', { name: 'view' }).click()
//                 await blog2.getByRole('button', { name: 'like' }).click()
//                 await expect(blog2.getByText('likes 1')).toBeVisible()

//                 const blogs = page.locator('.blog-summary')
//                 await expect(blogs.first()).toContainText('most liked blog')
//                 await expect(blogs.nth(1)).toContainText('middle liked blog')
//                 await expect(blogs.last()).toContainText('least liked blog')
//             })
                
    

//             test('a blog can be deleted', async ({page}) => {
//                await createBlog(page,'come on','work','you shit')
//                 page.on('dialog', async(dialog) => {
//                     await dialog.accept()
//                 })
//                 const blogElement = await page.locator('.blog-summary').filter({hasText: 'come on work'})

//                 await blogElement.getByRole('button', {name: 'view'}).click()
//                 await expect(page.getByText('remove')).toBeVisible()
//                 await blogElement.getByRole('button',{name:'remove'}).click()
               
//                 await expect(page.getByText('come on work')).not.toBeVisible()
//             })

//             test('user can only see the delete button', async({page}) => {
//                 await page.getByRole('button',{name:'logout'}).click()
//                 await loginWith(page,'rooter','salainen')
//                 await expect(page.getByText('rooter logged in')).toBeVisible()

//                 const blogElement = await page.getByText('a default blog compiler')
//                 await blogElement.getByRole('button',{name:'view'}).click()
//                 await expect(page.getByText('remove')).not.toBeVisible()
//             })

//         })

//     })
})
