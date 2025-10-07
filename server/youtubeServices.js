const axios = require('axios');

async function getYoutubeVideos(skillName, weakTopics ,language) {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey) throw new Error("Missing YouTube API key");

  const results = [];

  for (const topic of weakTopics) {
    try {
      const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
          part: 'snippet',
          q: `${skillName} ${topic} tutorial`,
          type: 'video',
          maxResults: 3,
          relevanceLanguage: language,
          key: apiKey
        }
      });

      const links = response.data.items?.map(item =>
        `https://www.youtube.com/watch?v=${item.id.videoId}`
      ) || [];

      results.push({ topic, links });
    } catch (err) {
      console.error(`YouTube fetch failed for topic "${topic}":`, err.response?.data || err.message);
      results.push({ topic, links: [] });
    }
  }

  return results;
}

module.exports = { getYoutubeVideos };