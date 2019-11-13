import React, {Component} from 'react';
import Modal from '../../Common/Modal';

const EMPTY_ITEM_DATA = {
    name: "",
    description: "",
    coordinates: {lat: "", lon: ""}
}

class ItemDetailsForm extends Component{
    constructor(props){
        super(props);
        this.handleFormChanged = this.handleFormChanged.bind(this);
        this.handleGpsFormChanged = this.handleGpsFormChanged.bind(this);
        this.clearData = this.clearData.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            item: EMPTY_ITEM_DATA,
            dataReady: false,
            show: false
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.item !== this.props.item && this.props.item !== null) {
            this.setState({
                item: this.props.item,
                dataReady: true,
                show: true
            })
        }
    }

    handleFormChanged(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            item:{
                ...this.state.item, 
                [name]: value
            }
        });
    }

    handleGpsFormChanged(e){
        const name = e.target.name;
        const value = e.target.value;
        this.setState({
            item: {
                ...this.state.item, 
                coordinates: {
                    ...this.state.item.coordinates,
                    [name]: value
                }
            }
        });
    }

    onSubmit(item){
        this.props.onFinished(this.state.item);
        this.clearData()
    }

    clearData(){
        this.setState({
            item: EMPTY_ITEM_DATA,
            dataReady: false,
            show: false
        })
    }

    renderForm(){
        return(<form>
            <div className="form-group">
                <label htmlFor="item-name" className="col-form-label">Name</label>
                <input name="name" onChange={this.handleFormChanged} className="form-control" id="item-name" value={this.state.item.name}/>
            </div>
            <div className="form-row">
            <div className="form-group col-md-6">
                <label htmlFor="item-coordinates-lat" className="col-form-label">Gps latitude</label>
                <input name="lat" onChange={this.handleGpsFormChanged} className="form-control" id="item-coordinates-lat" value={this.state.item.coordinates.lat}/>
            </div>
            <div className="form-group col-md-6">
                <label htmlFor="item-coordinates-lon" className="col-form-label">Gps longitude</label>
                <input name="lon" onChange={this.handleGpsFormChanged} className="form-control" id="item-coordinates-lon" value={this.state.item.coordinates.lon}/>
            </div>
            </div>
            <div className="form-group">
                <label htmlFor="item-description">Description</label>
                <textarea name="description" onChange={this.handleFormChanged} className="form-control" rows="5" id="item-description" value={this.state.item.description}></textarea>
            </div>
        </form>)
    }

    renderLoader(){
        return(
            <div class="d-flex justify-content-center">
                <span>Loading...</span>
            </div>
        );
    }

    renderFooter(){
        return(
            <div>
                <button type="submit" className="btn btn-primary" onClick={this.onSubmit} data-dismiss="modal">Save</button>
                <button type="button" className="btn" data-dismiss="modal" onClick={this.clearData}>Cancel</button>
            </div>
        );
    }

    render(){
        return(
            <div>
                <Modal 
                    show={this.state.show} 
                    content={this.state.dataReady ? this.renderForm() : this.renderLoader()}
                    header="Edit details" 
                    footer={this.renderFooter()}/>
            </div>
        )
    }
};

export default ItemDetailsForm;