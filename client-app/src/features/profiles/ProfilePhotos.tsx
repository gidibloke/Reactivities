import React, { useContext, useState } from 'react'
import { Tab, Header, Card, Image, Button, Grid } from 'semantic-ui-react'
import { RootStoreContext } from '../../app/stores/rootStore';
import PhotoUploadWidgets from '../../app/common/photoUpload/PhotoUploadWidgets';
import { observer } from 'mobx-react-lite';

const ProfilePhotos = () => {
    const rootStore = useContext(RootStoreContext);
    const {profile, IsCurrentUser, uploadingPhoto, uploadPhoto, setMainPhoto, loading, deletePhoto} = rootStore.profileStore;
    
    const[addPhotoMode, setAddPhotoMode] = useState(false);
    
    const handleUploadImage= (photo: Blob) => {
        uploadPhoto(photo).then(() => setAddPhotoMode(false))
    }
    const [target, setTarget] = useState<string | undefined>(undefined)
    const [deleteTarget, setDeleteTarget] = useState<string | undefined>(undefined)
    
    
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{paddingBottom: 0}}>
                    <Header floated='left' icon='image' content='Photos'/>
                    { IsCurrentUser && <Button onClick={() => setAddPhotoMode(!addPhotoMode)} floated='right' basic content={addPhotoMode ? 'Cancel' : 'Add Photo'}/>}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode? (
                        <PhotoUploadWidgets uploadPhoto={handleUploadImage} loading={uploadingPhoto}/>
                    ): <Card.Group itemsPerRow={5}>
                        {profile && profile.photos.map((photo) => (
                            <Card key={photo.id}>
                                <Image src={photo.url}/>
                                {IsCurrentUser && (
                                    <Button.Group fluid widths={2}>
                                        <Button 
                                            name={photo.id}
                                            basic 
                                            positive 
                                            content='Main' 
                                            onClick={(e) => {
                                                setMainPhoto(photo);
                                                setTarget(e.currentTarget.name)
                                            }}
                                            loading = {loading && target === photo.id}
                                            disabled={photo.isMain}
                                        />
                                        <Button 
                                            onClick={(e) => {
                                            deletePhoto(photo);
                                            setDeleteTarget(e.currentTarget.name)                                            
                                        }}
                                        loading={loading && deleteTarget === photo.id}
                                        disabled={photo.isMain} 
                                            name={photo.id} 
                                            basic 
                                            negative 
                                            icon='trash'/>
                                    </Button.Group>
                                )}
                            </Card>
                        ))}
                    </Card.Group>}

                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
}
export default observer (ProfilePhotos)