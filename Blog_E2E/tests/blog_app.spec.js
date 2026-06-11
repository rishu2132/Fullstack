const { test, expect, beforeEach, describe } = require('@playwright/test')

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
        await page.getByLabel('username').fill('mluukkai')
        await page.getByLabel('password').fill('salainen')
        await page.getByRole('button', {name:'login'}).click()
        await expect(page.getByText('blogs')).toBeVisible()
        await expect(page.getByText('mluukkai logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({page}) => {
        await page.getByLabel('username').fill('mluukkai')
        await page.getByLabel('password').fill('wrong')
        await page.getByRole('button', {name:'login'}).click()

        await expect(page.getByText('blogs')).not.toBeVisible()
        await expect(page.getByText('wrong username or password')).toBeVisible()
    })

    
    })

    describe('when logged in ', () => {
        beforeEach( async ({page,request}) => {
            await page.getByLabel('username').fill('mluukkai')
            await page.getByLabel('password').fill('salainen')
            await page.getByRole('button', {name:'login'}).click()
        })

        test('a new blog can be created', async ({page}) => {
            await page.getByRole('button', {name: 'create new blog'}).click()
            await page.getByLabel('title:').fill('a new blog by playwright')
            await page.getByLabel('author:').fill('fullstack')
            await page.getByLabel('url:').fill('404')
            await page.getByRole('button', {name:'create'}).click()

            await expect(page.getByText('a new blog by playwright fullstack')).toBeVisible()
        })

    })
})