/**
 * Article Management Service
 * Provides helper functions for retrieving, creating, updating, and deleting blog/news content.
 */

const STORAGE_KEY = 'admin_articles';

/**
 * Fetch all articles from localStorage or fallback to public/data.json.
 * @returns {Promise<Array>} Array of article objects.
 */
export async function getArticles() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    } catch (e) {
      console.error('Error parsing stored articles:', e);
    }
  }

  try {
    const res = await fetch('/data.json');
    const data = await res.json();
    const items = data.articles || data.newsArticles || [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return items;
  } catch (err) {
    console.error('Error fetching articles from data.json:', err);
    return [];
  }
}

/**
 * Get a single article by its ID.
 * @param {number|string} id 
 * @returns {Promise<Object|null>} Article object or null if not found.
 */
export async function getArticleById(id) {
  const articles = await getArticles();
  return articles.find((a) => String(a.id) === String(id)) || null;
}

/**
 * Create a new article.
 * @param {Object} articleData - Object containing title, content, excerpt, category, image, etc.
 * @returns {Promise<Object>} The newly created article.
 */
export async function createArticle(articleData) {
  const articles = await getArticles();
  
  const plainTextBody = articleData.content
    ? articleData.content.replace(/<[^>]+>/g, '').trim()
    : '';

  const newArticle = {
    id: Date.now(),
    title: articleData.title ? articleData.title.trim() : 'Untitled Article',
    excerpt: articleData.excerpt || plainTextBody.slice(0, 150) || 'New update published via admin portal.',
    content: articleData.content || '',
    category: articleData.category || 'community',
    categoryName: articleData.categoryName || 'Community Development',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    image: articleData.image || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=800&auto=format&fit=crop',
    tags: articleData.tags || ''
  };

  const updatedArticles = [newArticle, ...articles];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles));
  return newArticle;
}

/**
 * Update an existing article by ID.
 * @param {number|string} id 
 * @param {Object} updatedData 
 * @returns {Promise<Object>} The updated article.
 */
export async function updateArticle(id, updatedData) {
  const articles = await getArticles();
  
  const plainTextBody = updatedData.content
    ? updatedData.content.replace(/<[^>]+>/g, '').trim()
    : '';

  let updatedItem = null;
  const updatedArticles = articles.map((art) => {
    if (String(art.id) === String(id)) {
      updatedItem = {
        ...art,
        ...updatedData,
        title: updatedData.title ? updatedData.title.trim() : art.title,
        excerpt: updatedData.excerpt || plainTextBody.slice(0, 150) || art.excerpt,
        content: updatedData.content !== undefined ? updatedData.content : art.content,
        image: updatedData.image || art.image,
        category: updatedData.category || art.category,
        categoryName: updatedData.categoryName || art.categoryName,
        tags: updatedData.tags !== undefined ? updatedData.tags : art.tags
      };
      return updatedItem;
    }
    return art;
  });

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles));
  return updatedItem;
}

/**
 * Delete an article by ID.
 * @param {number|string} id 
 * @returns {Promise<Array>} The updated list of articles after deletion.
 */
export async function deleteArticle(id) {
  const articles = await getArticles();
  const filtered = articles.filter((art) => String(art.id) !== String(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
}
