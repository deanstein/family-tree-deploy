const sPAT = process.env.FAMILY_TREE_DATA_PAT;
console.log(sPAT);
const sRepoName = 'family-tree-data';
const sFileName = 'family-tree-data-test.json';
export const sendFamilyTreeDataToRepo = async (familyTreeData) => {
  const response = await fetch('https://api.github.com/user/repos', {
    headers: {
      Authorization: `Bearer ${sPAT}`,
      Accept: 'application/vnd.github.v3+json',
    },
  });

  const repos = await response.json();
  const repo = repos.find((repo) => repo.name === sRepoName);

  if (!repo) {
    console.error('Repository not found');
    return;
  }

  const content = JSON.stringify(familyTreeData, null, 2);
  const path = `/${sFileName}`;

  const fileResponse = await fetch(
    `https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents${path}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sPAT}`,
        Accept: 'application/vnd.github.v3+json',
      },
    }
  );

  console.log(sPAT);

  if (!fileResponse.ok) {
    console.error(`Failed to get file ${sFileName}`);
    return;
  }

  const file = await fileResponse.json();

  const updateResponse = await fetch(
    `https://api.github.com/repos/${repo.owner.login}/${repo.name}/contents${path}`,
    {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${sPAT}`,
        Accept: 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `Update ${sFileName}`,
        content: btoa(content),
        sha: file.sha,
      }),
    }
  );

  if (updateResponse.ok) {
    console.log(`File ${sFileName} updated successfully`);
  } else {
    console.error(`Failed to update file ${sFileName}`);
  }
}

