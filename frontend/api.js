import client from './apiClient';
import store from './src/store';

const SCORE_END_POINT = "/scores"
const AUTH_END_POINT = "/auth"

export default {

  async authenticate(credentials) {
    try {
      const response = await client.post(`${AUTH_END_POINT}/login`, credentials);
      return response.data;
    } catch (err) {
      throw (err)
    }
  },
  async getScores() {
    try {
      const response = await client.get(SCORE_END_POINT, {
        headers: {
          "Authorization": `Bearer ${store.getters.token}`
        }
      });
      return response.data
    } catch (err) {
      throw (err);
    }
  },

  async getScoresBySort(sortDirection) {
    try {
      const res = await client.get(SCORE_END_POINT, {
        headers: {
          "Authorization": `Bearer ${store.getters.token}`
        },
        params: {
          orderBy: sortDirection
        }
      });
      return res.data;
    } catch (err) {
      throw err;
    }
  },
  async postScore(newScore) {

    try {
      const response = await client.post(SCORE_END_POINT, newScore, {
        headers: {
          "Authorization": `Bearer ${store.getters.token}`
        }
      });
      return response.data
    } catch (err) {
      throw (err);
    }
  },

  async deleteScore(scoreId) {
    try {
      const response = await client.delete(`${SCORE_END_POINT}/${scoreId}`, {
        headers: {
          "Authorization": `Bearer ${store.getters.token}`
        }
      });
      return response.data
    } catch (err) {
      throw (err);
    }
  },

  async resetScores() {
    try {
      const response = await client.delete(`${SCORE_END_POINT}`, {
        headers: {
          "Authorization": `Bearer ${store.getters.token}`
        }
      });
      return response.data
    } catch (err) {
      throw (err);
    }
  }
};
