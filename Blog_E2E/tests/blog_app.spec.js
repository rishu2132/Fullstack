const { test, expect, beforeEach, describe } = require('@playwright/test')
const {loginWith , createBlog} = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:5173/api/testing/reset')
    await request.post('http://localhost:5173/api/users', {
        data: {
            name: 'Matti Luukkainen',
            username: 'mluukkai',
            password: 'salainen'
        }
    })
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await expect(page.getByText('login')).toBeVisible()
  })

  describe('login', () => {
    test('succeed with correct credentials', async ({page}) => {
        await loginWith(page,'mluukkai','salainen')

        await expect(page.getByText('mluukkai logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({page}) => {
        await loginWith(page,'mluukkai','wrong')

        await expect(page.getByText('blogs')).not.toBeVisible()
        await expect(page.getByText('wrong username or password')).toBeVisible()
    })

    
    })

    describe('when logged in ', () => {
        beforeEach( async ({page,request}) => {
            await loginWith(page, 'mluukkai', 'salainen')
        })

        test('a new blog can be created', async ({page}) => {
            await createBlog(page,'a new blog by playwright','fullstack','404')

            await expect(page.getByText('a new blog by playwright fullstack')).toBeVisible()
        })

        describe('default blogs is created',() => {
            beforeEach(async ({page,request}) => {
                
                await createBlog(page,'a default blog','compiler','playwright.com')
                await createBlog(page,'a default blog2','browser','201')

            })

            test('a blog can be liked ', async({page}) => {
                const blogElement = await page.getByText('a default blog compiler')

                await blogElement.getByRole('button', {name:'view'}).click()
                await expect(page.getByText('likes 0')).toBeVisible()
        
                await page.getByRole('button', {name:'like'}).click()
                await expect(page.getByText('likes 1')).toBeVisible()

            })

            test('a blog can be deleted', async ({page}) => {
               await createBlog(page,'come on','work','you shit')
                page.on('dialog', async(dialog) => {
                    await dialog.accept()
                })
                const blogElement = await page.locator('.blog-summary').filter({hasText: 'come on work'})

               
               
                await blogElement.getByRole('button', {name: 'view'}).click()
                await expect(page.getByText('remove')).toBeVisible()

                
                await blogElement.getByRole('button',{name:'remove'}).click()
               
                await expect(page.getByText('come on work')).not.toBeVisible()
            })
        })

    })
})