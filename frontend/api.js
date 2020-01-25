import client from './apiClient';

const END_POINT = "/scores"



export default {
  async getScores() {
    try {
      const response = await client.get(END_POINT);
      return response.data
    } catch (e) {
      throw (e);
    }
  },

  async getScoresBySort(sortDirection) {
    try {
      const res = await client.get(END_POINT, {
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
      const response = await client.post(END_POINT, newScore);
      return response.data
    } catch (e) {
      throw (e);
    }

  }
};
