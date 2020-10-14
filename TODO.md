# TODO

1. [x] Project initialization
2. [x] Entity Framework (Postgresql)
3. [x] Create Domain Entities
   1. [x]  AppUser
   2. [x]  Post
   3. [x]  Category
   4. [x]  Reaction
   5. [x]  Comment
   6. [x]  Reply
   7. [x]  Newsletter
   8. [x]  AnonymousUser
4. [x] Identity
5. [x] Migration
6. [x] Seeding
   1. [x]  AppUser
   2. [x]  Post
   3. [x]  Category
   4. [x]  Reaction
   5. [x]  Comment
   6. [x]  Reply
   7. [x]  Newsletter
   8. [x]  AnonymousUser
7. [x] API - JWT Token
8. [x] Swagger
9. [x] Swagger Authentication
10. [x] Middleware Exception
11. [x] API - User
12. [x] API - Posts
    1.  [x] API - Posts Create
    2.  [x] Add FluentValidator for the slug
    3.  [x] API - Posts Read    
    4.  [x] API - Post Details
    5.  [x] API - Posts Update
    6.  [x] API - Posts Delete
        1.  [x] How to handle nested delete (Cascading?)
13. [x] API - Reactions
14. [x] API - Newsletter
15. [x] API - Category
16. [x] API - AnonymousUser
17. [x] API - Comments
    1.  [x] Test Create
    2.  [x] Test Delete
18. [x] API - Reply
    1.  [x] Test Create 
    2.  [x] Test Delete
19. [x] CS - Nav Bar
    1.  [x] Search Box
        1.  [x] Fix routing
        2.  [x] Blur when user selects a post 
        3.  [x] Right now if user goes to detailed post and refresh, no results and displayed
    2.  [ ] Dark Mode
        1.  [x] Fix Bug of when interacting with Nav Bar, dark moddle toggle moves.
        2.  [x] Store in local storage the preference
        3.  [x] Style Everywhere
		4.  [x] Get default system preference
    3.  [ ] Hamburguer for mobile <---
    4.  [x] If user is in detailed page, change "Programming lines" to h2
20. [x] CS - Login  
21. [x] CS - Posts
    1.  [x] Add category on the opposite side of the title 
    2.  [x] Time to read
    3.  [x] User has liked
        1.  [x] If user never liked
        2.  [x] Loading when liking
    4.  [x] Add date
    5.  [ ] Container it posts list should be bigger on bigger devices
    6.  [x] Fix Posts order by date
        1.  [x] Do I really need to pass a querystring for the publish date order?
    7.  [ ] Image of the posts should always be the same size
22. [ ] CS - PostDetails
    1.  [x] Shouldn't call API if it's in memory (use history.push)
    2.  [x] Put in the title "Programming Lines - Title of the Post"
    3.  [x] Reactions and share
    4.  [ ] ~~ Reading Process bar ~~
    5.  [ ] Placeholder
    6.  [x] Category Button on click filter
    7.  [x] Fix linkedin icon hover
23. [ ] ~~CS - Replies ~~
24. [x] CS - Reactions
25. [x] AnonymousUser 
    1.  [x] Store in Local Storage AnonUserId  
    2.  [x] API - Create/Login user receive ID instead of fingerprint 
    3.  [x] Store fingerprint only in state
    4.  [x] Fix bug related to anonusers and reactions
26. [x] Recommendations
    1.  [x] Card should always be the same size
27. [x] CS - Newsletter
    1.  [x] Post API
    2.  [x] Display error
    3.  [x] Display success
    4.  [x] Loading button
    5.  [x] Clean form on submit
28. [x] CS - Filters
    1.  [x] Recent
    2.  [x] Popular
    3.  [x] Categories (Display all categories)
    4.  [x] API Side
    5.  [x] CS Side
    6.  [ ] On Mobile put the filters inside the hamburger sidebar <---
    7.  [x] Filter posts
    8.  [ ] Change styling between active and hover
    9.  [x] Filer on category icon click
    10. [x] Filter on category label inside post
    11. [x] Fix the filter by reactions and then by date on "Popular"
	12. [ ] Loading indicator in the filters
29. [ ] ~~CS - Comments~~
    1.  [ ] ~~Allow markdown?~~
30. [x] CS - NotFound Page
31. [x] CS - Next/Previous Post (Changed to recommended post)
32. [x] Share button on the post
33. [x] About me
    1.  [x] Photo
    2.  [x] Bio
    3.  [x] Social Media
34. [x] API - Add predicates
35. [x] Pagination
    1.  [x] Fix the pagination bug
        1.  [x] Click on "Recents" page 3 and then filter by "React", active page disappears
    2.  [x] Click "Popular", then "Recent", instead of only 1 element, got 2
    3.  [x] Lots of bugs
36. [x] React-markdown
37. [x] BackOffice
38. [x] BO - Posts
    1.  [x] Create
        1.  [x] Markdown preview
        2.  [x] Photo widget
            1.  [x] Cloudinary config on the api
        3.  [x] Category Dropdown
        4.  [x] Submit handler
        5.  [x] Maintain position of the scroll bar inside the content
        6.  [x] Clear button
    2.  [x] Delete
    3.  [x] Update
39. [ ] BO - Categories
    1.  [x] List of all the categories, with the edit and delete button
    2.  [x] Create
        1.  [x] Validate Hexacode
    3.  [x] Delete
    4.  [x] Update
	5.  [ ] When clicking in another tab, it should remove the edit
40. [x] BO - Newsletter
    1.  [x] Fetch the data
    2.  [x] List
41. [x] Footer
42. [x] Add post title in the index.tsx title
43. [ ] PWA
44. [ ] Responsiveness - react-media <----
    1.  [ ] Navbar
    2.  [ ] Post
    3.  [ ] Post Details
    2.  [ ] About me
    2.  [ ] Filters
45. [ ] SEO
46. [ ] Clean client app models (more models per file)
47. [ ] Release
    1.  [ ] Cloudinary Secrets
	2.  [ ] Deployment Heroku
48. [ ] Performance
	1.  [ ] Remove inline styling
	2.  [ ] Split css file in smaller chuncks
48. [ ] BUGS:
    1.  [x] If filter by category, and said category has no posts, it will forever load
    2.  [ ] Not fetching categories data in the dropdown when you directly into the admin page
	3.  [ ] Category icon in the recommend post is kinda out of the frame (Might be the image that is cropped)
49. [ ] FUTURE RELEASES:
    1.  [x] Edit post with dropzone
    2.  [ ] Edit post even if the image doesn't change, it will reupload it
    3.  [ ] Edit post if you just change the image and/or category, it won't allow to submit
    5.  [ ] Push posts to github "Posts" folder.
    6.  [ ] Push posts to medium.
