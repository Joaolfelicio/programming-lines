using System.Collections.Generic;
using Application.Comments.Model;
using Application.Reaction.Model;

namespace Application.Interface
{
    public interface IPopulateData
    {
         List<CommentDto> PopulateComments(Domain.Post post);
         List<ReactionDto> PopulateReactions(Domain.Post post);
    }
}