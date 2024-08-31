const RepoModel = require("../Models/Repos.js");
const UserModel = require("../Models/Users");
const express = require("express");

const router = express.Router();

router.get("/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const repos = await RepoModel.find({
      _id: { $in: user.repos },
    });
    res.json({ repos });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

router.post("/create", async (req, res) => {
  try {
    
    const { repo_url, UserId } = req.body;

    const repo = await RepoModel.findOne({ repo_url });
    if (repo) {
      return res.json({ message: "repository already exists !" });
    }
    const data = repo_url.slice(19);
    const repo_name = data.split("/")[1];
    const response = await fetch(`https://api.github.com/repos/${data}/issues`);
    console.log(`https://api.github.com/repos/${data}/issues`)
    const issues = await response.json();
    const latest_issue = issues[0];
    const last_issue_id = latest_issue.number;
    const last_issue_link = latest_issue.html_url;
    const newRepo = new RepoModel({
      repo_name,
      repo_url,
      last_issue_id,
      last_issue_link,
      UserId,
    });
    await newRepo.save();
    const user = await UserModel.findById({ _id: UserId });
    user.repos.push(newRepo);
    await user.save();
    return res.json({ success: true, message: "repo created successfully" });
  } catch (error) {
    return res.json({ message: error });
  }
});

router.delete("/:repoId", async (req, res) => {
  try {
    const id = req.params.repoId;
    const repo = await RepoModel.findById(id);
    const userid = repo.UserId;
    await UserModel.updateOne({ _id: userid }, { $pull: { repos: id } });
    await RepoModel.deleteOne({ _id: id });
  } catch (error) {
    return res.json({ message: error });
  }
});

router.put("/:repoId", async (req, res) => {
  const { repo_id, latest_issue_id } = req.body;
  const repo = await RepoModel.findById(repo_id);
  repo.last_issue_id = latest_issue_id;
  await repo.save();
});

module.exports = router;
