import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook to fetch mock data / API content with loading, error, search, category filter, and pagination support.
 */
export function useFetch(url = '/data.json', options = {}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { search = '', category = 'all', page = 1, limit = 6 } = options;

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate realistic API network response delay
      await new Promise((resolve) => setTimeout(resolve, 400));

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch data: HTTP ${response.status}`);
      }

      const json = await response.json();

      // Process articles filtering if articles exist
      let filteredArticles = json.articles || [];

      if (category && category !== 'all') {
        filteredArticles = filteredArticles.filter((article) => article.category === category);
      }

      if (search && search.trim() !== '') {
        const query = search.toLowerCase().trim();
        filteredArticles = filteredArticles.filter(
          (article) =>
            article.title.toLowerCase().includes(query) ||
            article.excerpt.toLowerCase().includes(query) ||
            article.categoryName.toLowerCase().includes(query)
        );
      }

      const totalItems = filteredArticles.length;
      const totalPages = Math.ceil(totalItems / limit) || 1;
      const currentPage = Math.min(Math.max(1, page), totalPages);

      const startIndex = (currentPage - 1) * limit;
      const paginatedArticles = filteredArticles.slice(startIndex, startIndex + limit);

      setData({
        raw: json,
        categories: json.categories || [],
        articles: paginatedArticles,
        totalArticles: totalItems,
        totalPages,
        currentPage,
        limit,
        featuredArticle: json.articles ? json.articles.find((a) => a.isFeatured) || json.articles[0] : null,
        impactStats: json.impactStats || [],
        coreFocusAreas: json.coreFocusAreas || [],
        recentPrograms: json.recentPrograms || [],
        testimonials: json.testimonials || [],
        aboutData: json.aboutData || null,
      });
    } catch (err) {
      console.error('useFetch error:', err);
      setError(err.message || 'An error occurred while loading data.');
    } finally {
      setLoading(false);
    }
  }, [url, search, category, page, limit]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
