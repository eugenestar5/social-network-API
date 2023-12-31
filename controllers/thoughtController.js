const { Thought, User } = require("../models");

const thoughtController = {
  // GET all Thoughts
  getThoughts(req, res) {
    Thought.find({})
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log("An error has occurred: ", err);
        res.status(500).json(err);
      });
  },

  // GET Thought by ID
  thoughtById(req, res) {
    Thought.findOne({ _id: req.params.id })
      .then((dbThoughtData) => {
        !dbThoughtData
          ? res.status(404).json({
              message: "Thought does not exist",
            })
          : res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log("An error has occurred:", err);
        res.status(500).json(err);
      });
  },

  // POST a Thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => {
        return User.findByIdAndUpdate(
          req.body.userId,
          { $push: { thoughts: dbThoughtData._id } },
          { new: true }
        );
      })
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log("An error has occurred: ", err);
        res.status(500).json(err);
      });
  },

  // UPDATE a Thought
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((updatedThought) => {
        if (!updatedThought) {
          return res.status(404).json({ message: "There is NO thought with this ID!" });
        } else {
          res.json(updatedThought);
        }
      })
      .catch((err) => res.json(err));
  },

  // DELETE a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
      .then((dbThoughtData) => {
        !dbThoughtData
          ? res.status(404).json({
              message: "Error: Thought does not exist.",
            })
          : res.status(200).json({
              message: "Thought deleted successfully.",
            });
      })
      .catch((err) => {
        console.log("An error has occurred: ", err);
        res.status(500).json(err);
      });
  },

  // POST a reaction
  createReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbThoughtData) => {
        !dbThoughtData
          ? res.status(404).json({ message: "There is No thought found with this ID!" })
          : res.json({
              message: "Successfully added reaction",
              dbThoughtData,
            });
      })
      .catch((err) => res.json(err));
  },

  // DELETE a reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } }
    )
      .then((dbThoughtData) => {
        !dbThoughtData
          ? res.status(404).json({
              message: "Error: Thought does not exist.",
            })
          : res.status(200).json({
              message: "Thought deleted successfully.",
            });
      })
      .catch((err) => {
        console.log("An error has occurred: ", err);
        res.status(500).json(err);
      });
  },
};

module.exports = thoughtController;