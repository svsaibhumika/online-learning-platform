import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import axiosInstance from '../../common/AxiosInstance';
import { Modal, Form } from 'react-bootstrap';

const TeacherHome = () => {
   const [allCourses, setAllCourses] = useState([]);
   const [editingCourse, setEditingCourse] = useState(null);
   const [newSection, setNewSection] = useState({
      S_title: '',
      S_description: '',
   });

   const getAllCoursesUser = async () => {
      try {
         const res = await axiosInstance.get(`api/user/getallcoursesteacher`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         });
         if (res.data.success) {
            setAllCourses(res.data.data);
         }
      } catch (error) {
         console.log('An error occurred:', error);
      }
   };

   useEffect(() => {
      getAllCoursesUser();
   }, []);

   const toggleDescription = (courseId) => {
      setAllCourses((prevCourses) =>
         prevCourses.map((course) =>
            course._id === courseId
               ? { ...course, showFullDescription: !course.showFullDescription }
               : course
         )
      );
   };

   const deleteCourse = async (courseId) => {
      const confirmation = confirm('Are you sure you want to delete')
      if (!confirmation) {
         return;
      }
      try {
         const res = await axiosInstance.delete(`api/user/deletecourse/${courseId}`, {
            headers: {
               Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
         })
         if (res.data.success) {
            alert(res.data.message)
            getAllCoursesUser()
         } else {
            alert("Failed to delete the course")
         }
      } catch (error) {
         console.log('An error occurred:', error);
      }
   }
   const handleEditClick = (course) => {
      setEditingCourse(course);
   };
   const handleAddSection = async (courseId) => {
      try {
         const res = await axiosInstance.put(
            `api/user/addsection/${courseId}`,
      newSection,
      {
         headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.data.success) {
         alert(res.data.message);
         setEditingCourse(null);
         setNewSection({
            S_title: '',
            S_description: '',
         });
         getAllCoursesUser(); // refresh courses
      } else {
         alert(res.data.message);
      }
      } catch (error) {
      console.log('An error occurred:', error);
      }
   };


   return (
      <>
      <Container className='card-container'>
         {allCourses?.length > 0 ? (
            allCourses.map((course) => (
               <Card key={course._id} className='card'>
                  {/* <Card.Img variant='top' src='holder.js/100px180' /> */}
                  <Card.Body>
                     <Card.Title>{course.C_title}</Card.Title>
                     <Card.Text>
                        <p>
                           <strong>Description: </strong>
                           {course.showFullDescription
                              ? course.C_description
                              : course.C_description.slice(0, 10)}{' '}
                           {course.C_description.length > 10 && (
                              <span
                                 className='read-more-link'
                                 onClick={() => toggleDescription(course._id)}
                              >
                                 {course.showFullDescription ? 'Read Less' : 'Read More'}
                              </span>
                           )}
                        </p>
                        <p>
                           <strong>Category: </strong>
                           {course.C_categories}
                        </p>
                        <p>
                           <strong>Sections: </strong> {course.sections.length}
                        </p>
                        <p style={{color: '#c3b9b9'}}>
                           <strong>Enrolled students: </strong> {course.enrolled}
                        </p>
                     </Card.Text>
                     <div style={{float: 'right'}} className='d-flex'>
                        <Button
                           variant='secondary'
                           className='me-2'
                           onClick={() => handleEditClick(course)}
                        >
                           Edit
                        </Button>

                        <Button variant='primary' onClick={() => deleteCourse(course._id)}>
                           Delete
                        </Button>

                     </div>
                  </Card.Body>
               </Card>
            ))
         ) : (
            'No courses found!!'
         )}
      </Container>
      <Modal
  show={!!editingCourse}
  onHide={() => setEditingCourse(null)}
>
  <Modal.Header closeButton>
    <Modal.Title>
      Edit Course: {editingCourse?.C_title}
    </Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleAddSection(editingCourse._id);
      }}
    >
      <Form.Group className='mb-3'>
        <Form.Label>Section Title</Form.Label>
        <Form.Control
          type='text'
          value={newSection.S_title}
          onChange={(e) =>
            setNewSection({
              ...newSection,
              S_title: e.target.value,
            })
          }
          required
        />
      </Form.Group>
      <Form.Group className='mb-3'>
        <Form.Label>Section Description</Form.Label>
        <Form.Control
          as='textarea'
          rows={3}
          value={newSection.S_description}
          onChange={(e) =>
            setNewSection({
              ...newSection,
              S_description: e.target.value,
            })
          }
          required
        />
      </Form.Group>
      <div className='d-flex justify-content-end'>
        <Button
          variant='secondary'
          className='me-2'
          onClick={() => setEditingCourse(null)}
        >
          Close
        </Button>
        <Button type='submit' variant='primary'>
          Save Section
        </Button>
      </div>
    </Form>
  </Modal.Body>
</Modal>
</>
   );
   


};

export default TeacherHome;