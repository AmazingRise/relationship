let relationship = {};

let sort = "all";

fetch('relationship.json')
  .then(response => response.json())
  .then(data => {
    relationship = data;
  });

const ifShow = (obj) => {
  if (sort == "all") {
    return true;
  }
  if (obj.group == "self") {
    return true;
  }
  // console.log(`Global sort: ${sort}, current sort: ${obj.group}`);
  return obj.group == sort;
}

const Graph = ForceGraph3D({
  extraRenderers: [new THREE.CSS2DRenderer()],
})
  (document.getElementById('3d-graph'))
  .backgroundColor("#ffffff")
  (document.getElementById('3d-graph'))
  //.graphData(relationship)
  .jsonUrl("relationship.json")
  .nodeAutoColorBy('group')
  .nodeThreeObject(node => {
    const nodeEl = document.createElement('div');
    let html = `
        <div class="card">
<div class="card-image-container">
    <img class="card-image" alt="avator" src="images/${node.id}.jpg" />
</div>
<div class="card-name">
    ${node.name}
</div>
</div>
        `;
    nodeEl.innerHTML = html;
    return new THREE.CSS2DObject(nodeEl);
    // // extend link with text sprite
    // const sprite = new SpriteText(`${node.id}`);
    // sprite.color = 'lightgrey';
    // sprite.textHeight = 1.5;
    // return sprite;
  })
  .nodeLabel(node => node.label)
  .nodeVisibility(ifShow)
  .linkAutoColorBy("group")
  .linkThreeObjectExtend(true)
  .linkWidth(1)
  .linkThreeObject(link => {
    // extend link with text sprite
    const nodeEl = document.createElement('div');
    let html = `${link.label}`;
    nodeEl.innerText = html;
    nodeEl.addEventListener('pointerdown', () => { alert(1) })
    return new THREE.CSS2DObject(nodeEl);
  })
  .linkPositionUpdate((sprite, { start, end }) => {
    const middlePos = Object.assign(...['x', 'y', 'z'].map(c => ({
      [c]: start[c] + (end[c] - start[c]) / 2 // calc middle point
    })));

    // Position sprite
    Object.assign(sprite.position, middlePos);
  })
  .linkVisibility(ifShow)
  .onNodeHover(()=>{
    console.log("hi");
  })
  //.linkLabel(link => link.label)
  //.nodeThreeObjectExtend(true) // Giving a ball
  ;


const sortClickHandler = (newSort) => {
  sort = newSort;
  Graph.refresh();
  //console.log("refreshed."+sort);
}

const buttons = document.getElementsByClassName("control-sort");

Array.from(buttons).forEach(button => {
  button.addEventListener("click", e => {
    sortClickHandler(button.value);
  });
});


const avators = document.getElementsByClassName("card-image");
console.log(1);
Array.from(avators).forEach(avator => {
  console.log(avator);
  avator.addEventListener("pointerdown", ()=>{
    console.log(1);
    // console.log(node.name);
    // window.location.href = "https://www.bing.com/search?q="+node.name;
  })
});
