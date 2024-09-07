"use client";
import React, { useState } from 'react';
import Input from '@/components/Input';
import Button from '@/components/Button';

const JobPostForm = () => {
  const [formData, setFormData] = useState({
    postName: '',
    description: '',
    image: null,
    notificationLink: '',
    importantDates: [{ label: '', date: '' }],
    applicationFee: [{ label: '', amount: '' }],
    ageLimit: [{ label: '', age: '' }],
    applyLink: [{ label: '', link: '' }],
    resultLink: [{ label: '', link: '' }],
    admitCardLink: [{ label: '', link: '' }],
    answerkeyLink: [{ label: '', link: '' }],
    AdmissionLink: [{ label: '', link: '' }],
    multiChild: [{ postname: '', qualifications: [''] }],
    multiGrandChild: [{ title: '', titleChild: [{ titleChildName: '', titleGrandChild: [''] }] }],
    multiGrandChild2: [{ title: '', titleChild: [{ titleChildName: '', titleGrandChild: [{ label: '', post: '' }] }] }],
    state: '',
    beginDate: '',
    lastDate: '',
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'file' ? files[0] : value,
    }));
  };

  const handleArrayChange = (e, index, field) => {
    const { name, value } = e.target;
    const updatedArray = [...formData[field]];
    updatedArray[index][name] = value;
    setFormData((prevData) => ({
      ...prevData,
      [field]: updatedArray,
    }));
  };

  const addArrayItem = (field) => {
    const newItem = field === 'importantDates' ? { label: '', date: '' } :
                    field === 'applicationFee' ? { label: '', amount: '' } :
                    field === 'ageLimit' ? { label: '', age: '' } :
                    field === 'applyLink' ? { label: '', link: '' } :
                    field === 'resultLink' ? { label: '', link: '' } :
                    field === 'admitCardLink' ? { label: '', link: '' } :
                    field === 'answerkeyLink' ? { label: '', link: '' } :
                    field === 'AdmissionLink' ? { label: '', link: '' } :
                    field === 'multiChild' ? { postname: '', qualifications: [''] } :
                    field === 'multiGrandChild' ? { title: '', titleChild: [{ titleChildName: '', titleGrandChild: [''] }] } :
                    field === 'multiGrandChild2' ? { title: '', titleChild: [{ titleChildName: '', titleGrandChild: [{ label: '', post: '' }] }] } :
                    null;

    if (newItem) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: [...prevData[field], newItem],
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formDataToSend.append(`${key}[]`, JSON.stringify(item));
        });
      } else {
        formDataToSend.append(key, value);
      }
    });

    try {
      const response = await fetch('/api/job-post', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Job post created successfully:', data);
      } else {
        console.error('Error creating job post:', data.message);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  return (
    <div className="py-32 px-2 flex flex-col items-center">
        <h2 className='text-2xl '>Create a Post </h2>
    <div className="flex justify-center items-center bg-slate-200">
    <form onSubmit={handleSubmit} className="p-4 space-y-5">
      <Input
        type="text"
        name="postName"
        className=" w-full"
        id="postName"
        label="Post Name"
        value={formData.postName}
        onChange={handleChange}
        required
      />
      <Input
        type="textarea"
        name="description"
        id="description"
        label="Description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <Input
        type="file"
        name="image"
        id="image"
        label="Image"
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="notificationLink"
        id="notificationLink"
        label="Notification Link"
        value={formData.notificationLink}
        onChange={handleChange}
        required
      />
      <Input
        type="date"
        name="beginDate"
        id="beginDate"
        label="Begin Date"
        value={formData.beginDate}
        onChange={handleChange}
        required
      />
      <Input
        type="date"
        name="lastDate"
        id="lastDate"
        label="Last Date"
        value={formData.lastDate}
        onChange={handleChange}
        required
      />
      <Input
        type="text"
        name="state"
        id="state"
        label="State"
        value={formData.state}
        onChange={handleChange}
      />

      {/* Important Dates */}
      <h3>Important Dates</h3>
      {formData.importantDates.map((date, index) => (
        <div key={index}>
          <Input
            type="text"
            name="label"
            id={`importantDateLabel${index}`}
            label="Label"
            value={date.label}
            onChange={(e) => handleArrayChange(e, index, 'importantDates')}
          />
          <Input
            type="date"
            name="date"
            id={`importantDate${index}`}
            label="Date"
            value={date.date}
            onChange={(e) => handleArrayChange(e, index, 'importantDates')}
          />
        </div>
      ))}
      <Button onClick={() => addArrayItem('importantDates')} />         
      {/* Application Fee */}
      <h3>Application Fee</h3>
      {formData.applicationFee.map((fee, index) => (
        <div key={index}>
          <Input
            type="text"
            name="label"
            id={`applicationFeeLabel${index}`}
            label="Label"
            value={fee.label}
            onChange={(e) => handleArrayChange(e, index, 'applicationFee')}
          />
          <Input
            type="number"
            name="amount"
            id={`applicationFeeAmount${index}`}
            label="Amount"
            value={fee.amount}
            onChange={(e) => handleArrayChange(e, index, 'applicationFee')}
          />
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem('applicationFee')}>
        Add Application Fee
      </button>

      {/* Age Limit */}
      <h3>Age Limit</h3>
      {formData.ageLimit.map((age, index) => (
        <div key={index}>
          <Input
            type="text"
            name="label"
            id={`ageLimitLabel${index}`}
            label="Label"
            value={age.label}
            onChange={(e) => handleArrayChange(e, index, 'ageLimit')}
          />
          <Input
            type="number"
            name="age"
            id={`ageLimitAge${index}`}
            label="Age"
            value={age.age}
            onChange={(e) => handleArrayChange(e, index, 'ageLimit')}
          />
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem('ageLimit')}>
        Add Age Limit
      </button>

      {/* Links (Apply, Result, Admit Card, Answer Key, Admission) */}
      {['applyLink', 'resultLink', 'admitCardLink', 'answerkeyLink', 'AdmissionLink'].map((linkField) => (
        <div key={linkField}>
          <h3>{linkField.replace(/([A-Z])/g, ' $1').trim()} Links</h3>
          {formData[linkField].map((link, index) => (
            <div key={index}>
              <Input
                type="text"
                name="label"
                id={`${linkField}Label${index}`}
                label="Label"
                value={link.label}
                onChange={(e) => handleArrayChange(e, index, linkField)}
              />
              <Input
                type="text"
                name="link"
                id={`${linkField}Link${index}`}
                label="Link"
                value={link.link}
                onChange={(e) => handleArrayChange(e, index, linkField)}
              />
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem(linkField)}>
            Add {linkField.replace(/([A-Z])/g, ' $1').trim()} Link
          </button>
        </div>
      ))}

      {/* Multi Child */}
      <h3>Multi Child</h3>
      {formData.multiChild.map((child, index) => (
        <div key={index}>
          <Input
            type="text"
            name="postname"
            id={`multiChildPostname${index}`}
            label="Post Name"
            value={child.postname}
            onChange={(e) => handleArrayChange(e, index, 'multiChild')}
          />
          <Input
            type="text"
            name="qualifications"
            id={`multiChildQualifications${index}`}
            label="Qualifications (comma-separated)"
            value={child.qualifications.join(', ')}
            onChange={(e) => {
              const qualifications = e.target.value.split(',').map((q) => q.trim());
              setFormData((prevData) => {
                const updatedMultiChild = [...prevData.multiChild];
                updatedMultiChild[index].qualifications = qualifications;
                return { ...prevData, multiChild: updatedMultiChild };
              });
            }}
          />
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem('multiChild')}>
        Add Multi Child
      </button>

      {/* Multi Grand Child */}
      <h3>Multi Grand Child</h3>
      {formData.multiGrandChild.map((grandChild, index) => (
        <div key={index}>
          <Input
            type="text"
            name="title"
            id={`multiGrandChildTitle${index}`}
            label="Title"
            value={grandChild.title}
            onChange={(e) => handleArrayChange(e, index, 'multiGrandChild')}
          />
          {grandChild.titleChild.map((titleChild, childIndex) => (
            <div key={childIndex}>
              <Input
                type="text"
                name="titleChildName"
                id={`multiGrandChildTitleChildName${index}${childIndex}`}
                label="Title Child Name"
                value={titleChild.titleChildName}
                onChange={(e) => {
                  const updatedTitleChild = [...grandChild.titleChild];
                  updatedTitleChild[childIndex].titleChildName = e.target.value;
                  setFormData((prevData) => {
                    const updatedMultiGrandChild = [...prevData.multiGrandChild];
                    updatedMultiGrandChild[index].titleChild = updatedTitleChild;
                    return { ...prevData, multiGrandChild: updatedMultiGrandChild };
                  });
                }}
              />
              <Input
                type="text"
                name="titleGrandChild"
                id={`multiGrandChildTitleGrandChild${index}${childIndex}`}
                label="Title Grand Child (comma-separated)"
                value={titleChild.titleGrandChild.join(', ')}
                onChange={(e) => {
                  const titleGrandChild = e.target.value.split(',').map((g) => g.trim());
                  setFormData((prevData) => {
                    const updatedTitleChild = [...grandChild.titleChild];
                    updatedTitleChild[childIndex].titleGrandChild = titleGrandChild;
                    const updatedMultiGrandChild = [...prevData.multiGrandChild];
                    updatedMultiGrandChild[index].titleChild = updatedTitleChild;
                    return { ...prevData, multiGrandChild: updatedMultiGrandChild };
                  });
                }}
              />
            </div>
          ))}
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem('multiGrandChild')}>
        Add Multi Grand Child
      </button>

      {/* Multi Grand Child 2 */}
      <h3>Multi Grand Child 2</h3>
      {formData.multiGrandChild2.map((grandChild2, index) => (
        <div key={index}>
          <Input
            type="text"
            name="title"
            id={`multiGrandChild2Title${index}`}
            label="Title"
            value={grandChild2.title}
            onChange={(e) => handleArrayChange(e, index, 'multiGrandChild2')}
          />
          {grandChild2.titleChild.map((titleChild, childIndex) => (
            <div key={childIndex}>
              <Input
                type="text"
                name="titleChildName"
                id={`multiGrandChild2TitleChildName${index}${childIndex}`}
                label="Title Child Name"
                value={titleChild.titleChildName}
                onChange={(e) => {
                  const updatedTitleChild = [...grandChild2.titleChild];
                  updatedTitleChild[childIndex].titleChildName = e.target.value;
                  setFormData((prevData) => {
                    const updatedMultiGrandChild2 = [...prevData.multiGrandChild2];
                    updatedMultiGrandChild2[index].titleChild = updatedTitleChild;
                    return { ...prevData, multiGrandChild2: updatedMultiGrandChild2 };
                  });
                }}
              />
              {titleChild.titleGrandChild.map((grandChild, grandChildIndex) => (
                <div key={grandChildIndex}>
                  <Input
                    type="text"
                    name="label"
                    id={`multiGrandChild2TitleGrandChildLabel${index}${childIndex}${grandChildIndex}`}
                    label="Label"
                    value={grandChild.label}
                    onChange={(e) => {
                      const updatedGrandChild = [...titleChild.titleGrandChild];
                      updatedGrandChild[grandChildIndex].label = e.target.value;
                      setFormData((prevData) => {
                        const updatedTitleChild = [...grandChild2.titleChild];
                        updatedTitleChild[childIndex].titleGrandChild = updatedGrandChild;
                        const updatedMultiGrandChild2 = [...prevData.multiGrandChild2];
                        updatedMultiGrandChild2[index].titleChild = updatedTitleChild;
                        return { ...prevData, multiGrandChild2: updatedMultiGrandChild2 };
                      });
                    }}
                  />
                  <Input
                    type="text"
                    name="post"
                    id={`multiGrandChild2TitleGrandChildPost${index}${childIndex}${grandChildIndex}`}
                    label="Post"
                    value={grandChild.post}
                    onChange={(e) => {
                      const updatedGrandChild = [...titleChild.titleGrandChild];
                      updatedGrandChild[grandChildIndex].post = e.target.value;
                      setFormData((prevData) => {
                        const updatedTitleChild = [...grandChild2.titleChild];
                        updatedTitleChild[childIndex].titleGrandChild = updatedGrandChild;
                        const updatedMultiGrandChild2 = [...prevData.multiGrandChild2];
                        updatedMultiGrandChild2[index].titleChild = updatedTitleChild;
                        return { ...prevData, multiGrandChild2: updatedMultiGrandChild2 };
                      });
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
      <button type="button" onClick={() => addArrayItem('multiGrandChild2')}>
        Add Multi Grand Child 2
      </button>

      <button type="submit" className="mt-4 p-2 bg-blue-500 text-white rounded">
        Submit
      </button>
    </form>
    </div>
    </div>
  );
};

export default JobPostForm;