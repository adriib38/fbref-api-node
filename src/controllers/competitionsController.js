const Competition = require("../services/CompetitionService.js");

const endpointsHandlers = {
  classification: (req, res) => getClassification(req, res),
  stats: (req, res) => getStats(req, res),
  games: (req, res) => getGames(req, res),
};

const competitionsList = {
  LaLiga: "/LaLiga",
  PremierLeague: "/PremierLeague",
  SerieA: "/SerieA",
  Bundesliga: "/Bundesliga",
  Ligue1: "/Ligue1",
  Hypermotion: "/Hypermotion",
};

const endpointsList = {
  0: {
    endpoint: "/classification",
    description: "Retrieve the current league standings and team rankings."
  },
  1: {
    endpoint: "/stats",
    description: "Access detailed statistics and performance metrics for teams and in the league."
  },
  2: {
    endpoint: "/games",
    description: "Get information on upcoming matches, past game results, and match schedules for the league."
  }
};

const getCompetitions = (req, res) => {
  return res.status(200).json(competitionsList);
};

const competitionsListLower = Object.entries(competitionsList).reduce(
  (acc, [key, value]) => {
    acc[key.toLowerCase()] = value;
    return acc;
  },
  {}
);

const getCompetitionsEndpoints = (req, res) => {
  const competition = req.params.competitionId.toLowerCase();
  const comp = competitionsListLower[competition];
  if (!comp) {
    return res.status(404).json({
      message: `Competition "${competition}" not found`,
      competitionsList,
    });
  }
  return res.status(200).json(endpointsList);
};

const handlerEndpoint = (req, res) => {
  const endpoint = req.params.endpoint.toLowerCase();

  const handler = endpointsHandlers[endpoint];
  if (!handler) {
    return res.status(404).json({ message: "Endpoint not found" });
  }
  handler(req, res);
};

const getClassification = (req, res) => {
  competitionsAllowed = Object.keys(competitionsListLower);
  if (!competitionsAllowed.includes(req.params.competitionId)) {
    return res.status(404).json({
      message: `Competition "${req.params.competitionId}" not found`,
      competitionsList,
    });
  }

  Competition.getClassification(req.params.competitionId, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error getting classification", err });
    }
    return res.status(200).json(results);
  });
};

const getStats = (req, res) => {
  Competition.getStats(req.params.competitionId, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error getting classification", err });
    }
    return res.status(200).json(results);
  });
};

const getGames = (req, res) => {
  Competition.getGames(req.params.competitionId, (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error getting classification", err });
    }
    return res.status(200).json(results);
  });
};

module.exports = {
  getCompetitions,
  getCompetitionsEndpoints,
  handlerEndpoint,
};
