import subprocess

files = [
    "src/components/AdvancedPromptEditor.tsx",
    "src/components/AdvancedPromptScore.tsx",
    "src/components/ErrorBoundary.tsx",
    "src/components/LoadingStates.tsx",
    "src/components/PromptOptimizationDashboard.tsx",
    "src/lib/advanced-ai-service.ts",
    "src/lib/advanced-templates.ts",
    "src/lib/extended-templates.ts",
    "src/lib/professional-templates.ts",
    "src/lib/prompt-optimizer.ts",
    "src/lib/prompt-patterns.ts",
    "src/types/advanced.ts"
]

for file in files:
    branch = "feature/" + file.replace("/", "-").replace(".", "-")
    print(f"\n=== Processing {file} ===")
    subprocess.run(["git", "checkout", "main"])
    subprocess.run(["git", "pull"])
    subprocess.run(["git", "checkout", "-b", branch])
    subprocess.run(["git", "checkout", "stash", "--", file])
    subprocess.run(["git", "add", file])
    commit_msg = f"Update {file.split('/')[-1]}"
    subprocess.run(["git", "commit", "-m", commit_msg])
    subprocess.run(["git", "push", "-u", "origin", branch])
    pr_title = commit_msg
    pr_body = f"{commit_msg} with latest changes."
    subprocess.run([
        "gh", "pr", "create",
        "--base", "main",
        "--head", branch,
        "--title", pr_title,
        "--body", pr_body
    ]) 