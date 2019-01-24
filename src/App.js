import React, { Component } from 'react';
import './App.css';
import ItemsList from './components/ItemsList/ItemsList'
import ItemDetails from './ItemDetails'
import Menu from './components/Menu/Menu'
import AddNewItem from './components/AddNewItem/AddNewItem';
import Search from './components/Search/Search'

class App extends Component {
  constructor(props){
    super(props);

    this.handleNewItemAdded = this.handleNewItemAdded.bind(this);

    this.state = {
      itemsList: [
        new ItemDetails("Tasman Lake", 
        `Tasman Lake is a proglacial lake formed by the recent retreat of the Tasman Glacier in New Zealand's South Island.[5]
    
        In the early 1970s, there were several small meltwater ponds on the Tasman Glacier. By 1990, these ponds had merged into Tasman Lake.[6]
        Tour boat among the icebergs on Tasman Lake
        
        Tasman Lake has quickened the retreat of the Tasman Glacier. Initially it did so by undercutting the cliff at the end of the glacier, causing parts of the cliff to fall into the lake. Since 2006, however, a 50–60 m apron of submerged glacial ice projects out from the cliff, and icebergs periodically break off the apron and float away down the lake. Because more of the glacier is now in contact with the water, its rate of retreat has increased. By 2008 the lake was 7 km long, 2 km wide and 245 m deep, having almost doubled in area since 2000.[7] It is expected to grow to a maximum length of about 16 km within the next one or two decades.[8]
        
        Tasman Lake, the glacier and the surrounding mountains are part of Aoraki/Mount Cook National Park. Taking a boat tour among the icebergs on the Tasman Lake is now a popular tourist activity.[9] The small inflatable boats are not allowed closer than 1.5 km (0.9 mi) to the 50 m (160 ft) tall terminal face of Tasman Glacier for safety reasons.[10] Tasman Lake can be reached by road from the nearby Mount Cook Village and a short walk from the car park at the end of the`, 
        4, 
        "43°41′S 170°10′E", 
        "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Lake_Tasman_and_Mount_Cook_101_5770.jpg/250px-Lake_Tasman_and_Mount_Cook_101_5770.jpg", 
        "https://en.wikipedia.org/wiki/Tasman_Lake"),
        new ItemDetails("Mount Cook", 
        `Aoraki / Mount Cook is the highest mountain in New Zealand. Its height since 2014 is listed as 3,724 metres (12,218 feet), down from 3,764 m (12,349 ft) before December 1991, due to a rockslide and subsequent erosion.[2] It lies in the Southern Alps, the mountain range which runs the length of the South Island. A popular tourist destination,[3] it is also a favourite challenge for mountain climbers. Aoraki / Mount Cook consists of three summits, from South to North the Low Peak (3,593 m or 11,788 ft), Middle Peak (3,717 m or 12,195 ft) and High Peak. The summits lie slightly south and east of the main divide of the Southern Alps, with the Tasman Glacier to the east and the Hooker Glacier to the southwest.[1]
    
        There was a large rock fall in 1991 that turned the summit into a knife-edge ridge and reduced the height of the mountain by an estimated 10 m or so at that time.[4] Aoraki / Mount Cook was measured in 2013 to be 3724 m, which is 30 m down from its pre-1991 rock-fall measurement.[4] `, 
        2, 
        "43°35′42.2″S 170°8′31.7″E", 
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Aoraki_Mount_Cook.JPG/270px-Aoraki_Mount_Cook.JPG", 
        "https://en.wikipedia.org/wiki/Aoraki_/_Mount_Cook"),
        new ItemDetails("Te Anau", 
        `Te Anau is a town in the Southland region of the South Island of New Zealand. It is on the eastern shore of Lake Te Anau in Fiordland. Lake Te Anau is the largest lake in the South Island and within New Zealand second only to Lake Taupo. The 2013 census recorded the town's population as 1,911.[1] The town has a wide range of accommodation, with over 4,000 beds available in summer.[2]
    
        Tourism and farming are the predominant economic activities in the area. Lying as it does at the borders of Fiordland National Park, it is the gateway to a wilderness area famed for tramping and spectacular scenery. Many tourists come to Te Anau to visit the famous nearby fiords Milford Sound and Doubtful Sound. The town is also used as a base for those undertaking the Milford Track and the Kepler Track, the latter being a 4-day loop from Te Anau. Visitors to the area also partake in activities such as kayaking, cycling, jet boat riding, fishing and hunting, farm tours and seaplane/helicopter sightseeing. In 2014, readers of New Zealand's Wilderness magazine voted Te Anau as the best location in New Zealand for tramping (hiking) opportunities.[3]
        
        Rising on the west side of Lake Te Anau, the Kepler and Murchison mountain ranges are evident from most of Te Anau. Many species of bird life are also found locally, notably the endangered Takahe which can be found at the Fiordland Wildlife Park. The Department of Conservation office in Te Anau is active in protecting endangered native birds[4]
        
        Te Anau hosts the Kepler Challenge in early December each year.
        
        Te Anau is connected by highway with Invercargill to the southeast, Queenstown to the northeast, Gore to the east, and Manapouri to the south. It is at the beginning of the Milford Road, the section of State Highway 94 that leads to Milford Sound, which lies 120 kilometres to the north.
        
        A local attraction is the Te Ana-au Caves across Lake Te Anau from the town. The caves include an underground glowworm grotto, which can be viewed from a punt during daily guided tours.[5]
        
        Te Anau has two schools; Fiordland College and Te Anau Primary school. `, 
        5, 
        "45_25_S_167_43_E", 
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Te_Anau_and_Murchison_Mountains.jpg/250px-Te_Anau_and_Murchison_Mountains.jpg", 
        "https://en.wikipedia.org/wiki/Te_Anau")
      ]
    }
  }

  handleNewItemAdded(newItem){
    this.setState(prevState => ({
      itemsList: [
        ...prevState.itemsList,
        new ItemDetails(
          newItem, 
          "desc", 
          3, 
          "...", 
          "...", 
          "...")
        ]
    }))
  }

  render() {
    return (
      <div className="App">
        <Menu />
        <Search />
        <ItemsList list={this.state.itemsList} />
        <AddNewItem onAdded={this.handleNewItemAdded}/>
      </div>
    );
  }
}

export default App;
