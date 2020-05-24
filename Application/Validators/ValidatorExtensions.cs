using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> SlugRules<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            return ruleBuilder.NotEmpty()
                              .MinimumLength(6).WithMessage("Slug must be at least 6 characters")
                              .Matches("^[a-z0-9]+(?:-[a-z0-9]+)*$").WithMessage("Slug must have a valid format");
        }

        public static IRuleBuilder<T, string> CategoryCodeRules<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            return ruleBuilder.NotEmpty()
                              .Matches("^[a-z]+$").WithMessage("Category Code must have a valid format");
        }
    }
}