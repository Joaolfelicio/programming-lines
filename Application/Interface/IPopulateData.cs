using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Comments.Model;
using Application.Post.Model;
using Application.Reaction.Model;

namespace Application.Interface
{
    public interface IPopulateData
    {
        List<CommentDto> PopulateComments(Domain.Post post);
        List<ReactionDto> PopulateReactions(Domain.Post post);
        Task<List<RecommendedPostDto>> PopulateRecommendPost(Domain.Post post);
    }
}