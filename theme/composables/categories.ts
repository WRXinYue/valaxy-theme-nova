import type { CategoryList, Post } from 'valaxy'
import type { MaybeRefOrGetter } from 'vue'
import { useSiteStore } from 'valaxy'
import { computed, toValue } from 'vue'

// Reference: https://github.com/YunYouJun/valaxy/blob/9e476f491d0f22e0b4cdc3691369fd26a9bda790/packages/valaxy/client/composables/categories.ts#L60C4
export function useCategories(category?: MaybeRefOrGetter<string>, posts: MaybeRefOrGetter<Post[]> = []) {
  return computed(() => {
    const categories = toValue(category)
    const _posts = toValue(posts)

    if (!_posts.length) {
      const site = useSiteStore()
      posts = site.postList
    }

    const categoryList: CategoryList = {
      name: 'All',
      total: _posts.length,
      children: new Map([
        ['Uncategorized', { name: 'Uncategorized', total: 0, children: new Map() }],
      ]),
    }

    const uncategorized = categoryList.children.get('Uncategorized')!

    _posts.forEach((post: Post) => {
      if (post.categories) {
        if (Array.isArray(post.categories)) {
          const len = post.categories.length

          let curCategory: CategoryList = categoryList

          post.categories.forEach((categoryName, i) => {
            curCategory.total++

            let nextCategory = curCategory.children.get(categoryName) as CategoryList

            // If the child category doesn't exist, create a new one and add it to the parent category
            if (!nextCategory) {
              nextCategory = {
                name: categoryName,
                total: 0,
                children: new Map(),
              }
              curCategory.children.set(categoryName, nextCategory)
            }

            // If it's the last category, add the post to the current category
            if (i === len - 1) {
              nextCategory.children.set(post.path!, post)
              nextCategory.total += 1
            }

            // Update the current category to the next category
            curCategory = nextCategory
          })
        }
        else {
          // for string
          const categoryName = post.categories
          const curCategory = categoryList.children.get(categoryName)

          if (curCategory) {
            curCategory.total += 1
            curCategory.children.set(post.path!, post)
          }
          else {
            categoryList.children.set(categoryName, {
              name: categoryName,
              total: 1,
              children: new Map([
                [post.path!, post],
              ]),
            })
          }
        }
      }
      else {
        uncategorized.total += 1
        uncategorized.children.set(post.path!, post)
      }
    })

    // `top` had been sorted in routes

    // clear uncategorized
    if (uncategorized!.total === 0)
      categoryList.children.delete('Uncategorized')

    if (!categories) {
      return categoryList
    }
    else {
      let curCategoryList = categoryList

      const categoryArr = categories.split('/')
      for (const categoryName of categoryArr) {
        const tempCList = curCategoryList.children.get(categoryName)
        if (tempCList && tempCList.children) {
          curCategoryList = tempCList as CategoryList
        }
        else {
          console.warn(`Do not have category: ${category}`)
          return categoryList
        }
      }
      return curCategoryList
    }
  })
}
