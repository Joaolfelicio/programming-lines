using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            var baseCategoryImageUrl = "https://res.cloudinary.com/joaolfelicio/image/upload/programming-lines/Categories/";
            var basePostImageUrl = "https://res.cloudinary.com/joaolfelicio/image/upload/programming-lines/Posts/";

            if (!userManager.Users.Any())
            {
                var users = new List<AppUser>
                {
                        new AppUser
                        {
                            Id = "99f2534d-5330-43b4-8ca4-923ffd45af00",
                            DisplayName = "Uncle Bob",
                            Email = "bob@programming.com",
                            UserName = "UncleBob"
                        },
                        new AppUser
                        {
                            Id = "a13dd54c-3728-47a6-a566-7095e4a4265a",
                            DisplayName = "Jim Coplin",
                            Email = "jim@programming.com",
                            UserName = "JimCoplin"
                        },
                        new AppUser
                        {
                            Id = "1b89570c-c033-489a-943f-0df793294beb",
                            DisplayName = "Wes Bos",
                            Email = "wes@programming.com",
                            UserName = "WesBos"
                        }
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
            };

            if (!context.Posts.Any())
            {
                var posts = new List<Post>
                {
                    new Post
                    {
                        Author = context.Users.FirstOrDefault(),
                        Category = new Category
                        {
                            Code = "react",
                            Image = baseCategoryImageUrl + "react",
                            Name = "React",
                            CreationDate = DateTime.Now,
                            Color = "#61DAFB"
                        },
                        Content = "Lorem anim et labore eiusmod esse. Eiusmod fugiat occaecat elit excepteur. Lorem adipisicing consectetur pariatur magna.",
                        PublishDate = DateTime.Now,
                        Title = "Lorem Title",
                        SubTitle = "Lorem SubTitle",
                        Slug = "lorem-title",
                        Image = basePostImageUrl + "lorem-title",
                        Comments = new List<Comment>
                        {
                            new Comment
                            {
                                Author = new AnonymousUser
                                {
                                    Fingerprint = "i5iQ3azsn87pMXxvY42u",
                                    CreationDate = DateTime.Now
                                },
                                AuthorDisplayName = "TestDisplayName",
                                AuthorEmail = "Test@test.com",
                                Content = "This is a test comment",
                                PublishedDate = DateTime.Now,
                                Replies = new List<Reply>
                                {
                                    new Reply
                                    {
                                        Author = new AnonymousUser
                                        {
                                            Fingerprint = "r6PhcZnch4J3qDV8r7R",
                                            CreationDate = DateTime.Now
                                        },
                                        AuthorDisplayName = "TestReplyName",
                                        AuthorEmail = "TestReply@test.com",
                                        Content = "This is a test reply",
                                        CreationDate = DateTime.Now
                                    }
                                }
                            }
                        },
                        Reactions = new List<Reaction>
                        {
                            new Reaction
                            {
                                Author = new AnonymousUser
                                {
                                    Fingerprint = "TWU5fHSJEhQ46VbhDSG",
                                    CreationDate = DateTime.Now
                                },
                                IsPositive = true,
                                ReactionDate = DateTime.Now
                            }
                        }
                    },
                    new Post
                    {
                        Author = context.Users.FirstOrDefault(),
                        Category = new Category
                        {
                            Code = "dotnetcore",
                            Image = baseCategoryImageUrl + "dotnetcore",
                            Name = ".NET Core",
                            CreationDate = DateTime.Now,
                            Color = "#6D409D"
                        },
                        Content = "Lorem anim et labore eiusmod esse. Eiusmod fugiat occaecat elit excepteur. Lorem adipisicing consectetur pariatur magna.",
                        PublishDate = DateTime.Now,
                        Title = "Lorem Title 2",
                        SubTitle = "Lorem SubTitle 2",
                        Slug = "lorem-title-2",
                        Image = basePostImageUrl + "lorem-title",
                        Comments = new List<Comment>
                        {
                            new Comment
                            {
                                Author = new AnonymousUser
                                {
                                    Fingerprint = "abce",
                                    CreationDate = DateTime.Now
                                },
                                AuthorDisplayName = "TestDisplayName2",
                                AuthorEmail = "Test2@test.com",
                                Content = "This is a test comment2",
                                PublishedDate = DateTime.Now,
                                Replies = new List<Reply>
                                {
                                    new Reply
                                    {
                                        Author = new AnonymousUser
                                        {
                                            Fingerprint = "abc",
                                            CreationDate = DateTime.Now
                                        },
                                        AuthorDisplayName = "TestReplyName2",
                                        AuthorEmail = "TestReply@test.com2",
                                        Content = "This is a test reply2",
                                        CreationDate = DateTime.Now
                                    },
                                    new Reply
                                    {
                                        Author = new AnonymousUser
                                        {
                                            Fingerprint = "abc3",
                                            CreationDate = DateTime.Now
                                        },
                                        AuthorDisplayName = "TestReplyName3",
                                        AuthorEmail = "TestReply@test.com3",
                                        Content = "This is a test reply3",
                                        CreationDate = DateTime.Now
                                    }
                                }
                            },
                            new Comment
                            {
                                Author = new AnonymousUser
                                {
                                    Fingerprint = "abce11",
                                    CreationDate = DateTime.Now
                                },
                                AuthorDisplayName = "TestDisplayName3",
                                AuthorEmail = "Test3@test.com",
                                Content = "This is a test comment3",
                                PublishedDate = DateTime.Now
                            }
                        },
                        Reactions = new List<Reaction>
                        {
                            new Reaction
                            {
                                Author = new AnonymousUser
                                {
                                    Fingerprint = "TWU5fHSJEgQ46VbhDSG",
                                    CreationDate = DateTime.Now
                                },
                                IsPositive = true,
                                ReactionDate = DateTime.Now
                            },
                            new Reaction
                            {
                                Author = new AnonymousUser
                                {
                                    Fingerprint = "13123",
                                    CreationDate = DateTime.Now
                                },
                                IsPositive = true,
                                ReactionDate = DateTime.Now
                            }
                        }
                    },
                    new Post
                    {
                        Author = context.Users.FirstOrDefault(),
                        Category = new Category
                        {
                            Code = "csharp",
                            Image = baseCategoryImageUrl + "csharp",
                            Name = "C#",
                            CreationDate = DateTime.Now,
                            Color = "#546E7A"
                        },
                        Content = "Lorem anim et labore eiusmod esse. Eiusmod fugiat occaecat elit excepteur. Lorem adipisicing consectetur pariatur magna.",
                        PublishDate = DateTime.Now,
                        Title = "Lorem Title 3",
                        SubTitle = "Lorem SubTitle 3",
                        Slug = "lorem-title-3",
                        Image = basePostImageUrl + "lorem-title"
                    }
                };

                context.Posts.AddRange(posts);
            }

            if (!context.Newsletters.Any())
            {
                var newsletters = new List<Newsletter>
                {
                    new Newsletter
                    {
                        DisplayName = "TestName",
                        Email = "test@test.com",
                        SubscriptionDate = DateTime.Now
                    },
                    new Newsletter
                    {
                        DisplayName = "TestName2",
                        Email = "test2@test.com",
                        SubscriptionDate = DateTime.Now
                    },
                    new Newsletter
                    {
                        DisplayName = "TestName3",
                        Email = "test3@test.com",
                        SubscriptionDate = DateTime.Now
                    },
                    new Newsletter
                    {
                        DisplayName = "TestName4",
                        Email = "test4@test.com",
                        SubscriptionDate = DateTime.Now
                    },
                    new Newsletter
                    {
                        DisplayName = "TestName5",
                        Email = "test5@test.com",
                        SubscriptionDate = DateTime.Now
                    }
                };
                context.AddRange(newsletters);
            }
            
            await context.SaveChangesAsync();
        }
    }
}