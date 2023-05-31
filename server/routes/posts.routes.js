const posts = require("../controllers/posts.controller")
const express = require("express")
const router = express.Router()
const { isAuthenticated } = require("../middleware/jwt.middleware")
//This should be in the same place as the database model, but for demonstration purposes we leave it here.
/**
 * @openapi
 * components:
 *   schemas:
 *     Posts:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           description: Post ID owner of the post
 *           example: 1
 *         id:
 *           type: integer
 *           description: Post ID
 *           example: 1
 *         title:
 *           type: string
 *           description: Post title
 *           example: Post Title
 *         body:
 *           type: string
 *           description: Post Body
 *           example: Post description
 */

/**
 * @openapi
 * /api/posts/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Get Access Token.
 *     description: Demonstrative Authentication Route to use JWT and Middleware.
 *     responses:
 *       200:
 *         description: The session started.
 *       401:
 *         description: Access denied.
 *       500:
 *         description: Request Failed.
 */
router.post("/login", posts.login)
/**
 * @openapi
 * /api/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Remove access token.
 *     description: Path to logout and deauthentication.
 *     responses:
 *       200:
 *         description: The session closed.
 *       500:
 *         description: Request Failed.
 */
router.post("/logout", posts.logout)

/**
 * @openapi
 * /api/posts/:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get List of all posts.
 *     description: Returns a list with the information of all the posts.
 *     responses:
 *       200:
 *         description: Post information obtained successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Posts"
 *
 *       500:
 *         description: Request Failed.
 */
router.get("/", isAuthenticated, posts.listUsers)
/**
 * @openapi
 * /api/posts/{id}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get information from a post by its ID.
 *     description: Returns the information of a post according to its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Post ID.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post information obtained successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Posts"
 *
 *       500:
 *         description: Request Failed.
 */
router.get("/:id", isAuthenticated, posts.getUserById)
/**
 * @openapi
 * /api/posts/create:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a new post.
 *     description: Create a new post with the information provided in the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: Post Owner ID.
 *                 example: 1
 *               id:
 *                 type: integer
 *                 description: Post ID.
 *                 example: 1
 *               title:
 *                 type: string
 *                 description: Post Title.
 *                 example: Post Title
 *               body:
 *                 type: string
 *                 description: Post Body.
 *                 example: Post description
 *     responses:
 *       200:
 *         description: Post created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Posts"
 *       400:
 *         description: data entry error
 *       404:
 *         description: post not found.
 *       500:
 *         description: request failed.
 */
router.post("/create", isAuthenticated, posts.create)
/**
 * @openapi
 * /api/posts/patching/{id}:
 *   patch:
 *     tags:
 *       - Posts
 *     summary: Edit a field of an existing post.
 *     description: Edit an existing post with the information provided in the request body and the post ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the post to edit.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Post title.
 *                 example: Updated post title
 *     responses:
 *       200:
 *         description: Post edited successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Posts"
 *       400:
 *         description: data entry error
 *       404:
 *         description: post not found.
 *       500:
 *         description: Request failed.
 */
router.patch("/patching/:id", isAuthenticated, posts.patching)
/**
 * @openapi
 * /api/posts/update/{id}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: Completely edit an existing post.
 *     description: Edit an existing post with the information provided in the request body and the post ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Post ID.
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *                 description: Post Owner ID.
 *                 example: 1
 *               title:
 *                 type: string
 *                 description: Post Title.
 *                 example: Updated post title
 *               body:
 *                 type: string
 *                 description: Post Body.
 *                 example: Updated post description
 *     responses:
 *       200:
 *         description: Post edited successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     $ref: "#/components/schemas/Posts"
 *       400:
 *         description: data entry error
 *       404:
 *         description: post not found.
 *       500:
 *         description: request failed.
 */
router.put("/update/:id", isAuthenticated, posts.update)
/**
 * @openapi
 * /api/posts/delete/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Delete an existing post.
 *     description: Delete an existing post based on its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the post to delete.
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Post successfully deleted.
 *       404:
 *         description: Post not found.
 *       500:
 *         description: Request failed.
 */
router.delete("/delete/:id", isAuthenticated, posts.delete)

module.exports = router