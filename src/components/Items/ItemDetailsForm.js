import React, {Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
            item: EMPTY_ITEM_DATA
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.item !== this.props.item && this.props.item !== null) {
            this.setState({
                item: this.props.item
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
            item: EMPTY_ITEM_DATA
        })
    }

    render(){
        return(
        <div>
            <div className="modal fade" id="itemDetailsFormModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit details</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                        <form>
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
                        </form>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary" onClick={this.onSubmit} data-dismiss="modal">Save</button>
                            <button type="button" className="btn" data-dismiss="modal" onClick={this.clearData}>Cancel</button></div>
                    </div>
                </div>
            </div>
        </div>
        )
    }
};

export default ItemDetailsForm;